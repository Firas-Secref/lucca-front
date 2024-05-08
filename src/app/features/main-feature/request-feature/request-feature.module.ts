import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestFeatureRoutingModule } from './request-feature-routing.module';
import { RequestComponent } from './request/request.component';
import {SharedModule} from "../../../shared/shared.module";
import { RequestMenuStatusComponent } from './request/request-menu-status/request-menu-status.component';
import { MyEmployeeRequestComponent } from './my-employee-request/my-employee-request.component';
import {MessageService} from "primeng/api";


@NgModule({
  declarations: [
    RequestComponent,
    RequestMenuStatusComponent,
    MyEmployeeRequestComponent
  ],
  imports: [
    CommonModule,
    RequestFeatureRoutingModule,
    SharedModule
  ],
  providers: [
    MessageService
  ]
})
export class RequestFeatureModule { }
