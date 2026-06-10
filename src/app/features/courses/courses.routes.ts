import { Routes } from '@angular/router';

export const COURSE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/course-list/course-list.component').then((m) => m.CourseListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/course-form/course-form.component').then((m) => m.CourseFormComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-details/course-details.component').then(
        (m) => m.CourseDetailsComponent,
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/course-form-edit/course-form-edit.component').then(
        (m) => m.CourseFormEditComponent,
      ),
  },
];
