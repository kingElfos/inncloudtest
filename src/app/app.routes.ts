import { Routes } from '@angular/router';
import { AuthGuard } from './lib/auth/guards/auth.guard';
import { LayoutComponent } from './lib/shared/components/layout/layout.component';

export const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [{
        path: 'projects',
        loadChildren: () =>
          import('./lib/projects/projects.module').then(
            (m) => m.ProjectsModule,
          ),

      },
      {
        path: 'tasks',

        loadChildren: () =>
          import('./lib/tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./lib/auth/auth.module').then((m) => m.AuthModule),
  },




];
