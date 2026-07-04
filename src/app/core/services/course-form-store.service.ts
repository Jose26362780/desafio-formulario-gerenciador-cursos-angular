import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CourseModel } from '../../shared/models/course-model';
import { LessonModel } from '../../shared/models/lesson-model';
import { ModuleModel } from '../../shared/models/module-model';

interface CourseFormLessonValue {
  name: string;
}

interface CourseFormModuleValue {
  name: string;
  lessons: CourseFormLessonValue[];
}

interface CourseFormValue {
  informations: {
    name: string;
    category: string;
    description: string;
  };
  modules: CourseFormModuleValue[];
}

@Injectable({
  providedIn: 'root',
})
export class CourseFormFactoryService {
  private readonly fb = inject(FormBuilder);

  // Form principal
  createCourseForm(courseData?: Partial<CourseModel>): FormGroup {
    return this.fb.group({
      informations: this.createInformationsGroup(courseData),
      modules: this.createModulesArray(courseData?.modules),
    });
  }

  // Grupo de informações
  createInformationsGroup(courseData?: Partial<CourseModel>): FormGroup {
    return this.fb.group({
      name: [courseData?.name ?? '', [Validators.required, Validators.minLength(3)]],
      category: [courseData?.category ?? '', [Validators.required, Validators.minLength(3)]],
      description: [courseData?.description ?? '', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Grupo de módulo
  createModuleGroup(moduleData?: Partial<ModuleModel>): FormGroup {
    return this.fb.group({
      name: [moduleData?.name ?? '', [Validators.required, Validators.minLength(3)]],
      lessons: this.createLessonsArray(moduleData?.lessons),
    });
  }

  // Grupo de aula
  createLessonGroup(lessonData?: Partial<LessonModel>): FormGroup {
    return this.fb.group({
      name: [lessonData?.name ?? '', [Validators.required, Validators.minLength(3)]],
    });
  }

  createCoursePayload(formValue: CourseFormValue): CourseModel {
    return {
      name: formValue.informations.name.trim(),
      category: formValue.informations.category.trim(),
      description: formValue.informations.description.trim(),
      modules: formValue.modules.map((module) => ({
        name: module.name.trim(),
        lessons: module.lessons.map((lesson) => ({
          name: lesson.name.trim(),
        })),
      })),
    };
  }

  createCourseFormFromApi(courseData: CourseModel): FormGroup {
    return this.createCourseForm(courseData);
  }

  private createModulesArray(modules?: ModuleModel[]): FormArray {
    return this.fb.array(
      modules?.length
        ? modules.map((module) => this.createModuleGroup(module))
        : [this.createModuleGroup()],
      [this.minArrayLengthValidator(1)],
    );
  }

  private createLessonsArray(lessons?: LessonModel[]): FormArray {
    return this.fb.array(
      lessons?.length
        ? lessons.map((lesson) => this.createLessonGroup(lesson))
        : [this.createLessonGroup()],
      [this.minArrayLengthValidator(1)],
    );
  }

  // Validator customizado para arrays
  private minArrayLengthValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const array = control as FormArray;
      return array.length >= min
        ? null
        : { minArrayLength: { required: min, actual: array.length } };
    };
  }
}
