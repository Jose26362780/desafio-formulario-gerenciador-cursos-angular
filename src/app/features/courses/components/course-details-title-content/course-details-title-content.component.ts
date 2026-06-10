import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseModel } from '../../../../shared/models/course-model';

@Component({
  selector: 'app-course-details-title-content',
  imports: [RouterLink],
  templateUrl: './course-details-title-content.component.html',
})
export class CourseDetailsTitleContentComponent {
  @Input() courseId: string = '';

  @Input() course!: CourseModel;
}
