import { CanActivateFn } from '@angular/router';

export const employeeGuard: CanActivateFn = (route, state) => {
  console.log("employee guard")
  if (localStorage.getItem("role") ==="EMPLOYEE") return false

  return true;
};
