import { CanActivateFn } from '@angular/router';

export const managerGuardGuard: CanActivateFn = (route, state) => {
  console.log("manager guard")
  if (localStorage.getItem("role") ==="MANAGER") return true

  return false;
};
