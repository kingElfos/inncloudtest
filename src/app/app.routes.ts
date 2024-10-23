import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./lib/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        pathMatch:'full',
        redirectTo:'auth',
    },
];

