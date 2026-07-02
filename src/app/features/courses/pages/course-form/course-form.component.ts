import { Component, inject, OnInit } from '@angular/core';
import { CourseFormSectionOneInfoComponent } from '../../components/course-form-section-one-info/course-form-section-one-info.component';
import { CourseFormSectionTwoModulesComponent } from '../../components/course-form-section-two-modules/course-form-section-two-modules.component';
import { CourseService } from '../../../../core/services/course.service';
import { CourseFormFactoryService } from '../../../../core/services/course-form-store.service';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CourseFormSectionOneInfoComponent,
    CourseFormSectionTwoModulesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent implements OnInit {
  private readonly courseFormFactory = inject(CourseFormFactoryService);
  private readonly courseService = inject(CourseService);

  courseForm!: FormGroup;

  ngOnInit(): void {
    this.courseForm = this.courseFormFactory.createCourseForm();
  }

  // Getters auxiliares (agora vivem na page)
  get informationsFormGroup(): FormGroup {
    return this.courseForm.get('informations') as FormGroup;
  }

  get modulesFormArray(): FormArray {
    return this.courseForm.get('modules') as FormArray;
  }

  getLessonsFormArray(moduleIndex: number): FormArray {
    return this.modulesFormArray.at(moduleIndex).get('lessons') as FormArray;
  }

  // Eventos vindos dos filhos
  onAddModule(): void {
    this.modulesFormArray.push(this.courseFormFactory.createModuleGroup());
  }

  onRemoveModule(index: number): void {
    this.modulesFormArray.removeAt(index);
  }

  onAddLesson(moduleIndex: number): void {
    this.getLessonsFormArray(moduleIndex).push(this.courseFormFactory.createLessonGroup());
  }

  onRemoveLesson(moduleIndex: number, lessonIndex: number): void {
    this.getLessonsFormArray(moduleIndex).removeAt(lessonIndex);
  }

  resetForm(): void {
    this.courseForm = this.courseFormFactory.createCourseForm();
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const formData = this.courseForm.value;

    this.courseService.create(formData).subscribe({
      next: () => {
        console.log('Curso criado com sucesso');
        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao criar curso', error);
      },
    });
  }

  onCancel(): void {
    this.resetForm();
  }
}
