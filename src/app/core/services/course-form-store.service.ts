import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CourseFormStoreService {
  private fb = inject(FormBuilder);

  //Estruturas do Formulario Com FormBuilder

  public readonly courseForm = this.fb.group({
    informations: this.fb.group({
      name: ['', Validators.required],
      category: [''],
      description: ['', Validators.required],
    }),
    modules: this.fb.array([this.createModuleGroup()]),
  });

  private createModuleGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      lessons: this.fb.array([this.createLessonGroup()], [Validators.required]),
    });
  }

  private createLessonGroup(): FormGroup {
    return this.fb.group({
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
}
