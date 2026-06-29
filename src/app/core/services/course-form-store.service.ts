import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CourseFormStoreService {
  private readonly _fb = inject(FormBuilder);

  //Estruturas do Formulario Com FormBuilder

  public readonly courseForm = this._fb.group({
    informations: this._fb.group({
      name: ['', Validators.required],
      category: [''],
      description: ['', Validators.required],
    }),
    modules: this._fb.array([this.createModuleGroup()]),
  });

  private createModuleGroup(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required],
      lessons: this._fb.array([this.createLessonGroup()], [Validators.required]),
    });
  }

  private createLessonGroup(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required],
    });
  }

  // Getters para ajudar nos acessos nos componentes e no html

  get informationsFormGroup(): FormGroup {
    return this.courseForm.get('informations') as FormGroup;
  }

  get modulesFormArray(): FormArray {
    return this.courseForm.get('modules') as FormArray;
  }

  // função para passar como indice as lições
  getLessonsFormArray(moduleIndex: number): FormArray {
    return this.modulesFormArray.at(moduleIndex).get('lessons') as FormArray;
  }

  // metodos que os componente vão chamar

  addModule(): void {
    this.modulesFormArray.push(this.createModuleGroup());
  }

  removeModule(index: number): void {
    this.modulesFormArray.removeAt(index);
  }

  addLesson(moduleIndex: number): void {
    this.getLessonsFormArray(moduleIndex).push(this.createLessonGroup());
  }

  removeLesson(moduleIndex: number, lessonsIndex: number): void {
    this.getLessonsFormArray(moduleIndex).removeAt(lessonsIndex);
  }

  resetForm(): void {
    this.courseForm.reset();
    this.modulesFormArray.clear();
    this.addModule();
  }

  // Metodo para popular Formulario na edição

  patchCourseData(courseData: any): void {
    this.courseForm.patchValue({
      informations: courseData.informations,
    });

    // Limpa os Modulos existentes e Adiciona os Novos

    this.modulesFormArray.clear();
    courseData.modules?.forEach((module: any) => {
      const moduleGroup = this.createModuleGroup();
      moduleGroup.patchValue({ name: module.name });

      //Limpa os modulos existentes e Adiciona os novos

      const lessonsArray = moduleGroup.get('lessons') as FormArray;
      lessonsArray.clear();
      module.lessons?.forEach((lesson: any) => {
        const lessonGroup = this.createLessonGroup();
        lessonGroup.patchValue(lesson);
        lessonsArray.push(lessonGroup);
      });

      this.modulesFormArray.push(moduleGroup);
    });
  }
}
