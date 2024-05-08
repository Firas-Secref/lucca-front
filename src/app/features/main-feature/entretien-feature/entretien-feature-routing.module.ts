import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntretienComponent} from "./entretien/entretien.component";
import {PrepareInterviewComponent} from "./prepare-interview/prepare-interview.component";
import {InterviewsListComponent} from "./interviews-list/interviews-list.component";
import {AnswerInterviewComponent} from "./answer-interview/answer-interview.component";
import {NotesComponent} from "./notes/notes.component";

const routes: Routes = [
  {
    path: '',
    component: EntretienComponent
  },
  {
    path: 'prepare',
    component: PrepareInterviewComponent
  },
  {
    path: 'notes/:employeeId',
    component: NotesComponent
  },
  {
    path: 'list/employee/:employeeId',
    component: InterviewsListComponent
  },
  {
    path: 'answerInterview/:interviewId',
    component: AnswerInterviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntretienFeatureRoutingModule { }
