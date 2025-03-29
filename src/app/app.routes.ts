import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guard/auth.guard';
import { roleGuard } from './guard/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(r => r.routes) },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '' ,redirectTo: 'simulations', pathMatch: 'full'},
      { path: 'simulations', loadChildren: () => import('./simulations/simulation.routes').then(r => r.routes) },
      { path: 'subscriptions', loadChildren: () => import('./subscriptions/subscription.routes').then(r => r.routes) }
    ],
    canMatch: [authGuard]
  }
];
