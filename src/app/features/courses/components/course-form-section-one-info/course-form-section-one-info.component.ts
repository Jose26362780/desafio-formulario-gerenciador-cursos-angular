import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form-section-one-info',
  imports: [],
  templateUrl: './course-form-section-one-info.component.html',
})
export class CourseFormSectionOneInfoComponent {
  @Input({ required: true }) informationsFormGroup!: FormGroup;
}
