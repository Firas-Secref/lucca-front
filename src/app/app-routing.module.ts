import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./features/main-feature/main/main.component";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=>import('./features/authentication/authentication.module').then(m=>m.AuthenticationModule),
  },
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: 'manageUsers',
        loadChildren: ()=>import('./features/main-feature/users-feature/users-feature.module').then(m=>m.UsersFeatureModule),
      },
      {
        path: 'profile',
        loadChildren: ()=>import('./features/main-feature/profile-feature/profile-feature.module').then(m=>m.ProfileFeatureModule),
      },
      {
        path: 'request',
        loadChildren: ()=>import('./features/main-feature/request-feature/request-feature.module').then(m=>m.RequestFeatureModule),
      },
      {
        path: 'schedule',
        loadChildren: ()=>import('./features/main-feature/schedule-feature/schedule-feature.module').then(m=>m.ScheduleFeatureModule),
      },
      {
        path: 'annualInterview',
        loadChildren: ()=>import('./features/main-feature/entretien-feature/entretien-feature.module').then(m=>m.EntretienFeatureModule),
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
