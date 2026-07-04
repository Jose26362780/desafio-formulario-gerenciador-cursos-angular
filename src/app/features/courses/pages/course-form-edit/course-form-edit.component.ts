import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CourseFormSectionOneInfoComponent } from '../../components/course-form-section-one-info/course-form-section-one-info.component';
import { CourseFormSectionTwoModulesComponent } from '../../components/course-form-section-two-modules/course-form-section-two-modules.component';
import { CourseService } from '../../../../core/services/course.service';
import { CourseFormFactoryService } from '../../../../core/services/course-form-store.service';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseModel } from '../../../../shared/models/course-model';

@Component({
  selector: 'app-course-form-edit',
  standalone: true,
  imports: [
    CourseFormSectionOneInfoComponent,
    CourseFormSectionTwoModulesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './course-form-edit.component.html',
})
export class CourseFormEditComponent implements OnInit {
  private readonly courseFormFactory = inject(CourseFormFactoryService);
  private readonly courseService = inject(CourseService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected courseForm: FormGroup = this.courseFormFactory.createCourseForm();
  protected courseId = '';
  protected courseName = '';

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        return;
      }

      this.courseId = id;
      this.loadCourseData(id);
    });
  }

  private loadCourseData(courseId: string): void {
    this.courseService.getById(courseId).subscribe((courseData) => {
      this.courseName = courseData.name;
      this.courseForm = this.courseFormFactory.createCourseFormFromApi(courseData);
    });
  }

  get informationsFormGroup(): FormGroup {
    return this.courseForm.get('informations') as FormGroup;
  }

  get modulesFormArray(): FormArray {
    return this.courseForm.get('modules') as FormArray;
  }

  onAddModule(): void {
    this.modulesFormArray.push(this.courseFormFactory.createModuleGroup());
  }

  onRemoveModule(index: number): void {
    this.modulesFormArray.removeAt(index);
  }

  onAddLesson(moduleIndex: number): void {
    const lessonsArray = this.modulesFormArray.at(moduleIndex).get('lessons') as FormArray;
    lessonsArray.push(this.courseFormFactory.createLessonGroup());
  }

  onRemoveLesson(moduleIndex: number, lessonIndex: number): void {
    const lessonsArray = this.modulesFormArray.at(moduleIndex).get('lessons') as FormArray;
    lessonsArray.removeAt(lessonIndex);
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const formData = this.courseFormFactory.createCoursePayload(this.courseForm.value);

    this.courseService.update(this.courseId, formData).subscribe({
      next: (updatedCourse: CourseModel) => {
        console.log('Curso atualizado com sucesso');
        this.courseName = updatedCourse.name;
        this.courseForm = this.courseFormFactory.createCourseFormFromApi(updatedCourse);
      },
      error: (error) => {
        console.error('Erro ao atualizar curso', error);
      },
    });
  }

  onCancel(): void {
    if (this.courseId) {
      this.loadCourseData(this.courseId);
      return;
    }

    this.courseForm = this.courseFormFactory.createCourseForm();
  }
}
