import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-course-card-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card-filter.component.html',
})
export class CourseCardFilterComponent {
  @Input() currentView: 'grid' | 'list' = 'grid';
  @Input() courseCount: number = 0;

  @Output() searchChanged = new EventEmitter<string>();
  @Output() viewChanged = new EventEmitter<ViewMode>();

  activeView: ViewMode = 'grid';

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchChanged.emit(input.value);
  }

  changeView(view: ViewMode): void {
    this.activeView = view;
    this.viewChanged.emit(view);
  }
}
