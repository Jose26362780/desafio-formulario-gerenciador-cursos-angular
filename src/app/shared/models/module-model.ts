import { LessonModel } from './lesson-model';

export interface ModuleModel {
  id?: string;
  name: string;
  lessons: LessonModel[];
}
