import { Routes } from '@angular/router';
import {AuthGuard} from './lib/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./lib/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'projects',
        loadChildren: () => import('./lib/projects/projects.module').then(m => m.ProjectsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'tasks',
        loadChildren: () => import('./lib/tasks/tasks.module').then(m => m.TasksModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        pathMatch:'full',
        redirectTo:'auth',
    },
];

