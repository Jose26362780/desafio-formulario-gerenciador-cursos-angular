import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseModel } from '../../../../shared/models/course-model';
import { UpperCasePipe } from '@angular/common';
import { ConfirmDeleteCouseDialogComponent } from '../../../../shared/components/confirm-delete-couse-dialog/confirm-delete-couse-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [UpperCasePipe, ConfirmDeleteCouseDialogComponent, RouterLink],
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {
  @Input() course!: CourseModel;

  @Output() edit = new EventEmitter<string>();

  @Output() delete = new EventEmitter<string>();

  showDeleteModal: boolean = false;

  getTotalLessons(): number {
    if (!this.course || !this.course.modules) {
      return 0;
    }

    return this.course.modules.reduce((total, module) => total + module.lessons.length, 0);
  }

  onEdit(): void {
    this.edit.emit(this.course.id);
  }

  onDelete(): void {
    this.showDeleteModal = true;
  }

  onCancelDelete(): void {
    this.showDeleteModal = false;
  }

  confirmDeleteCourse(courseId: string): void {
    this.delete.emit(courseId);
    this.showDeleteModal = false;
  }
}
