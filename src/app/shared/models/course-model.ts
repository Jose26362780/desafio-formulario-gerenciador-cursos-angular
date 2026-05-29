import { ModuleModel } from './module-model';

export interface CourseModel {
  id?: string;
  name: string;
  description: string;
  category: string;
  modules: ModuleModel[];
}
