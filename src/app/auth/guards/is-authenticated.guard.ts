import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';


//! Cada guard realiza una tarea específica. En este caso checkea si el usuario está autenticado.
export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }

  //No lo dejo pasar.
  router.navigateByUrl('/auth');
  return false;

};
