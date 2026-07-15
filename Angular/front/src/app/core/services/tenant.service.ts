import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TenantService {
  readonly tenantId = signal<string | null>(localStorage.getItem('skey_tenant_id'));

  setTenantId(value: string) {
    localStorage.setItem('skey_tenant_id', value);
    this.tenantId.set(value);
  }
}
