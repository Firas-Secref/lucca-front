import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import {UsersFeatureRoutingModule} from "./users-feature-routing.module";
import {Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import { EmployeesListComponent } from './employees-list/employees-list.component';

@NgModule({
  declarations: [
    UsersComponent,
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersFeatureRoutingModule
  ]
})
export class UsersFeatureModule { }
