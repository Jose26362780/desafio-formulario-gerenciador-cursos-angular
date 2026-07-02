import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export class CourseFormFactoryService {
  private readonly fb = inject(FormBuilder);

  // Form principal
  createCourseForm(): FormGroup {
    return this.fb.group({
      informations: this.createInformationsGroup(),
      modules: this.fb.array([this.createModuleGroup()], [this.minArrayLengthValidator(1)]),
    });
  }

  // Grupo de informações
  createInformationsGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: [''],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Grupo de módulo
  createModuleGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lessons: this.fb.array([this.createLessonGroup()], [this.minArrayLengthValidator(1)]),
    });
  }

  // Grupo de aula
  createLessonGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
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

  // Helper para reconstruir form com dados da API (edição)
  createCourseFormFromApi(courseData: any): FormGroup {
    const modules = this.fb.array(
      courseData.modules?.map((module: any) =>
        this.fb.group({
          name: [module.name, [Validators.required, Validators.minLength(3)]],
          lessons: this.fb.array(
            module.lessons?.map((lesson: any) =>
              this.fb.group({
                name: [lesson.name, [Validators.required, Validators.minLength(3)]],
              }),
            ) ?? [this.createLessonGroup()],
            [this.minArrayLengthValidator(1)],
          ),
        }),
      ) ?? [this.createModuleGroup()],
      [this.minArrayLengthValidator(1)],
    );

    return this.fb.group({
      informations: this.fb.group({
        name: [courseData.informations?.name ?? '', [Validators.required, Validators.minLength(3)]],
        category: [courseData.informations?.category ?? ''],
        description: [
          courseData.informations?.description ?? '',
          [Validators.required, Validators.minLength(10)],
        ],
      }),
      modules,
    });
  }
}
