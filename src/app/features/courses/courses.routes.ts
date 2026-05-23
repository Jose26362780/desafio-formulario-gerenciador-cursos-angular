import { Routes } from '@angular/router';

export const COURSE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./page/features/courses/pages/course-list/course-list').then((m) => m.CourseList),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./page/features/courses/pages/course-form/course-form').then((m) => m.CourseForm),
    data: { mode: 'create' },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./page/features/courses/pages/course-detail/course-detail').then(
        (m) => m.CourseDetail,
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./page/features/courses/pages/course-form/course-form').then((m) => m.CourseForm),
    data: { mode: 'edit' },
  },
];
