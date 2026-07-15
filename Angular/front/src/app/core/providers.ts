import { importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_CONFIG, NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, ar_EG } from 'ng-zorro-antd/i18n';
import { authInterceptor } from './interceptors/auth.interceptor';
import { tenantInterceptor } from './interceptors/tenant.interceptor';
import { NzModalModule } from 'ng-zorro-antd/modal';

const nzConfig: NzConfig = {
  message: { nzTop: 16 },
  notification: { nzTop: 24 }
};

export const coreProviders = makeEnvironmentProviders([
  provideHttpClient(withInterceptors([authInterceptor, tenantInterceptor])),
  provideAnimations(),
  provideRouter([]),
  provideNzConfig(nzConfig),
  importProvidersFrom(NzModalModule),
  {
    provide: NZ_I18N,
    useValue: ar_EG
  }
]);
