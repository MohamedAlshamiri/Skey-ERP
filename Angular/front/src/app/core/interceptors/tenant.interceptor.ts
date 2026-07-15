import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantService } from '../services/tenant.service';

export const tenantInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const tenant = inject(TenantService);
  const tenantId = tenant.tenantId();

  if (!tenantId) {
    return next(req);
  }

  const tenantRequest = req.clone({
    setHeaders: {
      'X-Tenant-ID': tenantId
    }
  });

  return next(tenantRequest);
};
