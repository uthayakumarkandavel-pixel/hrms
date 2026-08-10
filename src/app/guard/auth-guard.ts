import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = (_childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser;

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  if (state.url.startsWith('/team-leader') && user.role !== 'admin') {
    return router.createUrlTree(['/team-member/home']);
  }

  if (state.url.startsWith('/team-member') && user.role !== 'user') {
    return router.createUrlTree(['/team-leader/home']);
  }

  return true;
};
