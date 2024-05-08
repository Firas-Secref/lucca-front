import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  // {
  //   path: 'registerCondidate',
  //   component: RegisterEmployeeComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
