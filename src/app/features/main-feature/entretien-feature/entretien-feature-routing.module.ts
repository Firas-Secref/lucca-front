import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntretienComponent} from "./entretien/entretien.component";
import {PrepareInterviewComponent} from "./prepare-interview/prepare-interview.component";
import {InterviewsListComponent} from "./interviews-list/interviews-list.component";
import {AnswerInterviewComponent} from "./answer-interview/answer-interview.component";
import {NotesComponent} from "./notes/notes.component";
import {employeeGuard} from "../../../core/guards/employee.guard";
import {managerGuardGuard} from "../../../core/guards/manager-guard.guard";
import {rhGuardGuard} from "../../../core/guards/rh-guard.guard";
import {authGuardGuard} from "../../../core/guards/auth-guard.guard";

const routes: Routes = [
  {
    path: '',
    component: EntretienComponent
  },
  {
    path: 'prepare',
    component: PrepareInterviewComponent,
    canActivateChild: [employeeGuard, rhGuardGuard, authGuardGuard]

  },
  {
    path: 'notes/:employeeId',
    component: NotesComponent,
    canActivateChild: [employeeGuard, authGuardGuard]
  },
  {
    path: 'list/employee/:employeeId',
    component: InterviewsListComponent,
    canActivateChild: [employeeGuard, authGuardGuard]

  },
  {
    path: 'answerInterview/:interviewId',
    component: AnswerInterviewComponent,
    canActivateChild: [employeeGuard, authGuardGuard, managerGuardGuard]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntretienFeatureRoutingModule { }
