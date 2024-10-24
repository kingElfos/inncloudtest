import { Routes } from '@angular/router';
import { AuthGuard } from './lib/auth/guards/auth.guard';
import { LayoutComponent } from './lib/shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('./lib/projects/projects.module').then(
            (m) => m.ProjectsModule,
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./lib/tasks/tasks.module').then((m) => m.TasksModule),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./lib/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/projects',
  },
];
