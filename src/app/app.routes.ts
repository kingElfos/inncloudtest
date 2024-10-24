import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./lib/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'projects',
        loadChildren: () => import('./lib/projects/projects.module').then(m => m.ProjectsModule)
    },
    {
        path: 'tasks',
        loadChildren: () => import('./lib/tasks/tasks.module').then(m => m.TasksModule)
    },
    {
        path: '',
        pathMatch:'full',
        redirectTo:'auth',
    },
];

