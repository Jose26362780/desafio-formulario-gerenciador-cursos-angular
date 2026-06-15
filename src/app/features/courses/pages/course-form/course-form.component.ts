import { Component } from '@angular/core';
import { CourseFormSectionOneInfoComponent } from '../../components/course-form-section-one-info/course-form-section-one-info.component';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CourseFormSectionOneInfoComponent],
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {}
