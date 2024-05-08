import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {EmployeesListComponent} from "./employees-list/employees-list.component";

const routes: Routes = [
  {
    path: 'all',
    component: UsersComponent,
  },
  {
    path: 'employees',
    component: EmployeesListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersFeatureRoutingModule { }
