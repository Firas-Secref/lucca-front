import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from "./schedule/schedule.component";
import {VacationsFeatureComponent} from "./vacations-feature/vacations-feature.component";

const routes: Routes = [
  {
    path: 'office',
    component: ScheduleComponent
  },
  {
    path: 'holidays',
    component: VacationsFeatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleFeatureRoutingModule { }
