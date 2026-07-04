import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form-section-one-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-form-section-one-info.component.html',
})
export class CourseFormSectionOneInfoComponent {
  @Input({ required: true }) informationsFormGroup!: FormGroup;

  get nameControl(): AbstractControl {
    return this.informationsFormGroup.get('name')!;
  }

  get descriptionControl(): AbstractControl {
    return this.informationsFormGroup.get('description')!;
  }

  get categoryControl(): AbstractControl {
    return this.informationsFormGroup.get('category')!;
  }
}
