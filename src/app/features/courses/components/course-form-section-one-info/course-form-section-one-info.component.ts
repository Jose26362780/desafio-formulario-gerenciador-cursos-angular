import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form-section-one-info',
  imports: [ReactiveFormsModule],
  templateUrl: './course-form-section-one-info.component.html',
})
export class CourseFormSectionOneInfoComponent {
  @Input({ required: true }) informationsFormGroup!: FormGroup;

  get nameControl() {
    return this.informationsFormGroup.get('name');
  }

  get descriptionControl(): AbstractControl | null {
    return this.informationsFormGroup.get('description');
  }
}
