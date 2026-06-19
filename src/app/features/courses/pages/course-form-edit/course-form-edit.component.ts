import { Component } from '@angular/core';
import { CourseFormSectionOneInfoComponent } from '../../components/course-form-section-one-info/course-form-section-one-info.component';
import { CourseFormSectionTwoModulesComponent } from '../../components/course-form-section-two-modules/course-form-section-two-modules.component';

@Component({
  selector: 'app-course-form-edit',
  standalone: true,
  imports: [CourseFormSectionOneInfoComponent, CourseFormSectionTwoModulesComponent],
  templateUrl: './course-form-edit.component.html',
})
export class CourseFormEditComponent {}
