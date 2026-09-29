import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customers',
  },
  {
    path: 'customers/new',
    title: 'Nuevo cliente',
    loadComponent: () =>
      import('./features/customers/customer-form/customer-form.component').then(
        (m) => m.CustomerFormComponent,
      ),
  },
  {
    path: 'customers',
    title: 'Clientes',
    loadComponent: () =>
      import('./features/customers/customer-list/customer-list.component').then(
        (m) => m.CustomerListComponent,
      ),
  },
  {
    path: 'indicators',
    title: 'Indicadores',
    loadComponent: () =>
      import('./features/indicators/indicators-dashboard/indicators-dashboard.component').then(
        (m) => m.IndicatorsDashboardComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'customers',
  },
];
