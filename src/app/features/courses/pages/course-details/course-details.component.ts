import { Component, inject } from '@angular/core';
import { CourseDetailsTitleContentComponent } from '../../components/course-details-title-content/course-details-title-content.component';
import { CourseDetailsModuleContentComponent } from '../../components/course-details-module-content/course-details-module-content.component';
import { ActivatedRoute } from '@angular/router';
import { CourseModel } from '../../../../shared/models/course-model';
import { CourseService } from '../../../../core/services/course.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CourseDetailsTitleContentComponent, CourseDetailsModuleContentComponent],
  templateUrl: './course-details.component.html',
})
export class CourseDetailsComponent {
  private activatedRoute = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  courseId: string = '';
  course!: CourseModel;

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    if (!this.courseId) {
      return;
    }

    this.courseService.getById(this.courseId).subscribe((course) => {
      this.course = course;
    });
  }
}
