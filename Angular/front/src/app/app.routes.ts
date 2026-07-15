import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { UsersPageComponent } from './features/users/users-page.component';
import { LandingPageComponent } from './features/landing/landing-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { InventoryPageComponent } from './features/inventory/inventory-page.component';
import { ReportsPageComponent } from './features/reports/reports-page.component';
import { SettingsPageComponent } from './features/settings/settings-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // Entry: login
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    canMatch: [guestGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  // Authenticated app shell — one layout, swap page content in router-outlet
  {
    path: '',
    component: MainLayoutComponent,
    canMatch: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'inventory', component: InventoryPageComponent },
      { path: 'reports', component: ReportsPageComponent },
      { path: 'settings', component: SettingsPageComponent }
    ]
  },

  { path: 'landing', component: LandingPageComponent },

  { path: '**', redirectTo: 'auth/login' }
];
