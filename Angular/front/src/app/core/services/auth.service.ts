import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthCredentials {
  tenantId: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly token = signal<string | null>(null);
  readonly tenantId = signal<string | null>(null);
  readonly isAuthenticated = signal(false);

  constructor(private router: Router) {
    const storedToken = localStorage.getItem('skey_token');
    const storedTenant = localStorage.getItem('skey_tenant_id');
    if (storedToken && storedTenant) {
      this.token.set(storedToken);
      this.tenantId.set(storedTenant);
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: AuthCredentials) {
    const fakeToken = 'skey-fake-jwt-token';
    localStorage.setItem('skey_token', fakeToken);
    localStorage.setItem('skey_tenant_id', credentials.tenantId);
    this.token.set(fakeToken);
    this.tenantId.set(credentials.tenantId);
    this.isAuthenticated.set(true);
    this.router.navigate(['/users']);
  }

  register(credentials: AuthCredentials) {
    this.login(credentials);
  }

  logout() {
    localStorage.removeItem('skey_token');
    localStorage.removeItem('skey_tenant_id');
    this.token.set(null);
    this.tenantId.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }
}
