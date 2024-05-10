import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {EmployeesListComponent} from "./employees-list/employees-list.component";
import {rhGuardGuard} from "../../../core/guards/rh-guard.guard";
import {employeeGuard} from "../../../core/guards/employee.guard";
import {authGuardGuard} from "../../../core/guards/auth-guard.guard";

const routes: Routes = [
  {
    path: 'all',
    component: UsersComponent,
    canActivateChild: [employeeGuard]
  },
  {
    path: 'employees',
    component: EmployeesListComponent,
    canActivateChild: [authGuardGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersFeatureRoutingModule { }
