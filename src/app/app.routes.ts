import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses',
  },
  {
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.routes').then((m) => m.COURSE_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'courses',
  },
];
