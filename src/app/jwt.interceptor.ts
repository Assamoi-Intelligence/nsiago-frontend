import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  if (token && !req.url.includes('/auth/')) {
    req = req.clone({ setHeaders: {authorization: `Bearer ${token}`} });
  }
  return next(req);
};
