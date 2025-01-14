import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(({LoginComponent}) => LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/base.component').then(({BaseComponent}) => BaseComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/betting/betting.component').then(({BettingComponent}) => BettingComponent)
      }
    ]
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test/test.component').then(({TestComponent}) => TestComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
