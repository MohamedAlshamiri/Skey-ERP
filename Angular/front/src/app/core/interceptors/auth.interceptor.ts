import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Attaches a simple session id header — not a JWT. */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);
  const sessionId = auth.sessionId();

  if (!sessionId) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-Session-Id': sessionId
      }
    })
  );
};
