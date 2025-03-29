import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('acces_token');
  if (token && !req.url.includes('/auth/')) {
    req = req.clone({ setHeaders: {Authorization: `Bearer ${token}`} });
  }
  return next(req);
};
