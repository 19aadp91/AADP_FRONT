import { Routes } from '@angular/router';
import { LayautComponent } from './modules/layaut-component/layaut-component';
import { SesionGuard } from './core/guards/SesionGuard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [SesionGuard],
    loadComponent: () => import('./modules/layaut-component/layaut-component').then(m => m.LayautComponent),
    children: [
    {
      path: '',
      loadComponent: () => import('./modules/productos/productos').then(m => m.Productos)
    }
  ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login-component/login-component').then(m => m.LoginComponent)
  }
];
