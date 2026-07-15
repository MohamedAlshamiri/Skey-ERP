import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthSession {
  sessionId: string;
  userId: string;
  userName: string;
  email: string;
  roleName?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly sessionId = signal<string | null>(localStorage.getItem('skey_session_id'));
  readonly userId = signal<string | null>(localStorage.getItem('skey_user_id'));
  readonly userName = signal<string | null>(localStorage.getItem('skey_user_name'));
  readonly isAuthenticated = signal(!!localStorage.getItem('skey_session_id'));

  /** @deprecated kept for interceptor compatibility — stores session id, not JWT */
  readonly token = this.sessionId;

  login(credentials: LoginRequest): Observable<AuthSession> {
    return this.http
      .post<AuthSession>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(tap((session) => this.persistSession(session)));
  }

  register(payload: RegisterRequest): Observable<AuthSession> {
    return this.http
      .post<AuthSession>(`${environment.apiUrl}/auth/register`, payload)
      .pipe(tap((session) => this.persistSession(session)));
  }

  logout() {
    localStorage.removeItem('skey_session_id');
    localStorage.removeItem('skey_user_id');
    localStorage.removeItem('skey_user_name');
    localStorage.removeItem('skey_user_email');
    localStorage.removeItem('skey_token');
    localStorage.removeItem('skey_tenant_id');
    this.sessionId.set(null);
    this.userId.set(null);
    this.userName.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  private persistSession(session: AuthSession) {
    localStorage.setItem('skey_session_id', session.sessionId);
    localStorage.setItem('skey_user_id', session.userId);
    localStorage.setItem('skey_user_name', session.userName);
    localStorage.setItem('skey_user_email', session.email);
    this.sessionId.set(session.sessionId);
    this.userId.set(session.userId);
    this.userName.set(session.userName);
    this.isAuthenticated.set(true);
    this.router.navigate(['/users']);
  }
}
