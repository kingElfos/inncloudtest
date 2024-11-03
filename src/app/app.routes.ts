import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: 'auth',
  loadChildren: async () => (await import('./auth')).routes,
}];
