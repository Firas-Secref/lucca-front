import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../../shared/shared.module";
import { ErrorModalComponent } from './error-modal/error-modal.component';
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';


@NgModule({
  declarations: [
    LoginComponent,
    ErrorModalComponent,
    RegisterEmployeeComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class AuthenticationModule { }
