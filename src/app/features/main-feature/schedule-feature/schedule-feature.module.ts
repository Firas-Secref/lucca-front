import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleFeatureRoutingModule } from './schedule-feature-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';
import {SharedModule} from "../../../shared/shared.module";
import {MessageService} from "primeng/api";
import { TtRequestComponent } from './schedule/tt-request/tt-request.component';
import {DialogService} from "primeng/dynamicdialog";
import { VacationsFeatureComponent } from './vacations-feature/vacations-feature.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    TtRequestComponent,
    VacationsFeatureComponent,
  ],
  imports: [
    CommonModule,
    ScheduleFeatureRoutingModule,
    SharedModule
  ],
  providers: [
    MessageService,
    DialogService
  ]
})
export class ScheduleFeatureModule { }
