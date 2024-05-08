import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileFeatureRoutingModule } from './profile-feature-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileFeatureRoutingModule,
    SharedModule
  ]
})
export class ProfileFeatureModule { }
