import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { UsersPageComponent } from './features/users/users-page.component';
import { LandingPageComponent } from './features/landing/landing-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'users',
    component: MainLayoutComponent,
    canMatch: [authGuard],
    children: [{ path: '', component: UsersPageComponent }]
  },
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];
