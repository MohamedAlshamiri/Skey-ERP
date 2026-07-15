import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CreateUserRequest, UpdateUserRequest, UserListDto } from '../models/user.model';
import { UserFilterState } from '../models/user-filter-state.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  readonly users = signal<UserListDto[]>([
    {
      id: '1',
      name: 'أحمد محمد الحريري',
      email: 'a.hariri@skeyerp.com',
      role: 'admin',
      status: 'active',
      initials: 'أح',
      createdAt: new Date().toISOString(),
      lastLoginAt: '2026-07-14 15:30'
    },
    {
      id: '2',
      name: 'سارة عبد الله العتيبي',
      email: 's.otaibi@skeyerp.com',
      role: 'finance',
      status: 'active',
      initials: 'س ع',
      createdAt: new Date().toISOString(),
      lastLoginAt: '2026-07-14 14:15'
    },
    {
      id: '3',
      name: 'خالد وليد الشمراني',
      email: 'k.shamrani@skeyerp.com',
      role: 'operations',
      status: 'active',
      initials: 'خ و',
      createdAt: new Date().toISOString(),
      lastLoginAt: '2026-07-13 09:00'
    },
    {
      id: '4',
      name: 'رنا يوسف البلوشي',
      email: 'r.balushi@skeyerp.com',
      role: 'sales',
      status: 'inactive',
      initials: 'ر ي',
      createdAt: new Date().toISOString(),
      lastLoginAt: '2026-07-10 17:45'
    },
    {
      id: '5',
      name: 'عمر ياسر الفيفي',
      email: 'o.faifi@skeyerp.com',
      role: 'support',
      status: 'active',
      initials: 'ع ي',
      createdAt: new Date().toISOString(),
      lastLoginAt: '2026-07-14 11:20'
    }
  ]);

  constructor(private http: HttpClient) {}

  getUsers(filter: UserFilterState): Observable<UserListDto[]> {
    let filtered = this.users();
    if (filter.query) {
      const q = filter.query.toLowerCase();
      filtered = filtered.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (filter.role) {
      filtered = filtered.filter(u => u.role === filter.role);
    }
    if (filter.status) {
      filtered = filtered.filter(u => u.status === filter.status);
    }
    return of(filtered);
  }

  createUser(payload: CreateUserRequest): Observable<UserListDto> {
    const { password, ...userFields } = payload;
    const newUser: UserListDto = {
      ...userFields,
      id: 'u_' + Date.now(),
      initials: payload.name.split(' ').map((part) => part[0]).join(''),
      avatarUrl: undefined,
      createdAt: new Date().toISOString(),
      lastLoginAt: undefined
    };
    this.users.update((list) => [newUser, ...list]);
    return of(newUser);
  }

  updateUser(payload: UpdateUserRequest): Observable<UserListDto> {
    const updatedUser: UserListDto = {
      ...payload,
      initials: payload.name.split(' ').map((part) => part[0]).join(''),
      avatarUrl: undefined,
      createdAt: new Date().toISOString(),
      lastLoginAt: '2026-07-14 15:30'
    };
    this.users.update((list) => list.map((item) => (item.id === payload.id ? updatedUser : item)));
    return of(updatedUser);
  }

  deleteUser(id: string): Observable<void> {
    this.users.update((list) => list.filter((user) => user.id !== id));
    return of(void 0);
  }
}
