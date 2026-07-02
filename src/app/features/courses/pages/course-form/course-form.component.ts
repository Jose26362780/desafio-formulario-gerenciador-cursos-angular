import { Component, inject, OnInit } from '@angular/core';
import { CourseFormSectionOneInfoComponent } from '../../components/course-form-section-one-info/course-form-section-one-info.component';
import { CourseFormSectionTwoModulesComponent } from '../../components/course-form-section-two-modules/course-form-section-two-modules.component';
import { CourseService } from '../../../../core/services/course.service';
import { CourseFormStoreService } from '../../../../core/services/course-form-store.service';
import { ReactiveFormsModule } from '@angular/forms';

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
  protected readonly courseFormStore = inject(CourseFormStoreService);
  private readonly _courseService = inject(CourseService);

  ngOnInit(): void {
    this.courseFormStore.resetForm();
  }

  onSubmit(): void {
    if (this.courseFormStore.courseForm.valid) {
      const formData = this.courseFormStore.courseForm.value;

      console.log('Criar novo Curso: ', formData);

      // Aqui chamamos o service de API para criar o Curso
    } else {
      this.courseFormStore.courseForm.markAllAsTouched();
    }
  }
}
