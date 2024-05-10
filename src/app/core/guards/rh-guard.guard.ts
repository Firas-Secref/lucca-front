import { CanActivateFn } from '@angular/router';

export const rhGuardGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem("role") ==="RH") return true
  return false;
};
