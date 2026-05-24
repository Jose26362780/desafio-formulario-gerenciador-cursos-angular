import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../../../../../core/services/course.service';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
})
export class CourseListComponent {
  private readonly courseService = inject(CourseService);
}
