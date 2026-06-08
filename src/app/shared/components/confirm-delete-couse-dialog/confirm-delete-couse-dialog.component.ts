import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-couse-dialog',
  imports: [],
  templateUrl: './confirm-delete-couse-dialog.component.html',
})
export class ConfirmDeleteCouseDialogComponent {
  @Input() courseName: string = '';
  @Input() courseId: string = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<string>();

  onCancel(): void {
    this.cancel.emit();
  }

  onConfirmDelete(): void {
    this.confirmDelete.emit(this.courseId);
  }
}
