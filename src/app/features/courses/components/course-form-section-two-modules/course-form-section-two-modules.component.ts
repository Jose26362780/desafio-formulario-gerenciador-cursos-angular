import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form-section-two-modules',
  imports: [ReactiveFormsModule],
  templateUrl: './course-form-section-two-modules.component.html',
})
export class CourseFormSectionTwoModulesComponent {
  // Recebe o FormArray de módulos
  @Input({ required: true }) modulesFormArray!: FormArray;

  @Output() addModule = new EventEmitter<void>();
  @Output() removeModule = new EventEmitter<number>();
  @Output() addLesson = new EventEmitter<{ moduleIndex: number }>();
  @Output() removeLesson = new EventEmitter<{ moduleIndex: number; lessonIndex: number }>();

  getLessonsArray(moduleIndex: number): FormArray {
    return this.modulesFormArray.at(moduleIndex).get('lessons') as FormArray;
  }
}
