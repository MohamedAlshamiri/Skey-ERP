import { makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, ar_EG } from 'ng-zorro-antd/i18n';
import { authInterceptor } from './interceptors/auth.interceptor';
import { tenantInterceptor } from './interceptors/tenant.interceptor';

const nzConfig: NzConfig = {
  message: { nzTop: 16 },
  notification: { nzTop: 24 }
};

export const coreProviders = makeEnvironmentProviders([
  provideHttpClient(withInterceptors([authInterceptor, tenantInterceptor])),
  provideAnimations(),
  provideNzConfig(nzConfig),
  {
    provide: NZ_I18N,
    useValue: ar_EG
  }
]);
