import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const publicGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser;

  if (!user) {
    return true;
  }

  return user.role === 'admin'
    ? router.createUrlTree(['/team-leader/home'])
    : router.createUrlTree(['/team-member/home']);
};
