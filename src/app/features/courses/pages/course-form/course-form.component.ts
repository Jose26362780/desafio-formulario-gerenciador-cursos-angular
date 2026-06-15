import { Component } from '@angular/core';
import { CourseFormSectionOneInfoComponent } from '../../components/course-form-section-one-info/course-form-section-one-info.component';
import { CourseFormSectionTwoModulesComponent } from '../../components/course-form-section-two-modules/course-form-section-two-modules.component';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CourseFormSectionOneInfoComponent, CourseFormSectionTwoModulesComponent],
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {}
