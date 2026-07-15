import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateUserRequest, UpdateUserRequest, UserListDto } from '../models/user.model';
import { UserFilterState } from '../models/user-filter-state.model';

/** Backend UserDto shape */
interface ApiUserDto {
  id: string;
  userName: string;
  phoneNumber: string;
  email: string;
  age: number;
  accountStatus: number;
  roleId: string;
  roleName?: string | null;
}

const ROLE_IDS = {
  admin: '11111111-1111-1111-1111-111111111111',
  employee: '22222222-2222-2222-2222-222222222222',
  customer: '33333333-3333-3333-3333-333333333333'
} as const;

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  getUsers(filter: UserFilterState): Observable<UserListDto[]> {
    return this.http.get<ApiUserDto[]>(this.baseUrl).pipe(
      map((users) => {
        let mapped = users.map((u) => this.toListDto(u));

        if (filter.query) {
          const q = filter.query.toLowerCase();
          mapped = mapped.filter(
            (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
          );
        }
        if (filter.role) {
          mapped = mapped.filter((u) => u.role === filter.role);
        }
        if (filter.status) {
          mapped = mapped.filter((u) => u.status === filter.status);
        }

        return mapped;
      })
    );
  }

  createUser(payload: CreateUserRequest): Observable<UserListDto> {
    const body = {
      userName: payload.name,
      email: payload.email,
      password: payload.password,
      phoneNumber: payload.mobile?.trim() || this.fallbackPhone(),
      age: 18,
      accountStatus: payload.status === 'active' ? 0 : 1,
      roleId: this.toRoleId(payload.role)
    };

    return this.http.post<ApiUserDto>(this.baseUrl, body).pipe(map((u) => this.toListDto(u)));
  }

  updateUser(payload: UpdateUserRequest): Observable<UserListDto> {
    const body = {
      userName: payload.name,
      email: payload.email,
      phoneNumber: payload.mobile?.trim() || this.fallbackPhone(),
      age: 18,
      accountStatus: payload.status === 'active' ? 0 : 1,
      roleId: this.toRoleId(payload.role),
      password: ''
    };

    return this.http
      .put<ApiUserDto>(`${this.baseUrl}/${payload.id}`, body)
      .pipe(map((u) => this.toListDto(u)));
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toListDto(user: ApiUserDto): UserListDto {
    const name = user.userName || user.email;
    return {
      id: user.id,
      name,
      email: user.email,
      role: this.toFrontRole(user.roleName, user.roleId),
      status: user.accountStatus === 0 ? 'active' : 'inactive',
      initials: name
        .split(' ')
        .filter(Boolean)
        .map((p) => p[0])
        .join('')
        .slice(0, 2),
      createdAt: new Date().toISOString()
    };
  }

  private toRoleId(role: CreateUserRequest['role']): string {
    if (role === 'admin') return ROLE_IDS.admin;
    if (role === 'support') return ROLE_IDS.customer;
    return ROLE_IDS.employee;
  }

  private toFrontRole(
    roleName: string | null | undefined,
    roleId: string
  ): UserListDto['role'] {
    const name = (roleName || '').toLowerCase();
    if (name === 'admin' || roleId === ROLE_IDS.admin) return 'admin';
    if (name === 'customer' || roleId === ROLE_IDS.customer) return 'support';
    return 'operations';
  }

  private fallbackPhone(): string {
    return `0${Date.now().toString().slice(-10)}`;
  }
}
