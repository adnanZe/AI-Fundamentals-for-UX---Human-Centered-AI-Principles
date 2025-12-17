import { Routes } from '@angular/router';

export const actionHistoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/action-history-demo.component').then(
        (m) => m.ActionHistoryDemoComponent
      ),
  },
];
