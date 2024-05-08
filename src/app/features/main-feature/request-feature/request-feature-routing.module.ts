import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequestComponent} from "./request/request.component";
import {MyEmployeeRequestComponent} from "./my-employee-request/my-employee-request.component";

const routes: Routes = [
  {
    path:'',
    component: RequestComponent
  },
  {
    path:'myEmployees',
    component: MyEmployeeRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestFeatureRoutingModule { }
