export interface UserListDto {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'finance' | 'operations' | 'sales' | 'support';
  status: 'active' | 'inactive';
  initials: string;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface CreateUserRequest {
  tenantId: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'finance' | 'operations' | 'sales' | 'support';
  status: 'active' | 'inactive';
  mobile?: string;
  department?: string;
}

export interface UpdateUserRequest {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'finance' | 'operations' | 'sales' | 'support';
  status: 'active' | 'inactive';
  mobile?: string;
  department?: string;
}
