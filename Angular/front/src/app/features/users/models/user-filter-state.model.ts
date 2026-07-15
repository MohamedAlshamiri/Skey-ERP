export interface UserFilterState {
  query: string;
  role?: 'admin' | 'finance' | 'operations' | 'sales' | 'support';
  status?: 'active' | 'inactive';
  page: number;
  pageSize: number;
}
