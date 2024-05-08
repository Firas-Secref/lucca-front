import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntretienFeatureRoutingModule } from './entretien-feature-routing.module';
import { EntretienComponent } from './entretien/entretien.component';
import { PrepareInterviewComponent } from './prepare-interview/prepare-interview.component';
import {SharedModule} from "../../../shared/shared.module";
import {MessageService} from "primeng/api";
import { InterviewsListComponent } from './interviews-list/interviews-list.component';
import { AnswerInterviewComponent } from './answer-interview/answer-interview.component';
import { NotesComponent } from './notes/notes.component';


@NgModule({
  declarations: [
    EntretienComponent,
    PrepareInterviewComponent,
    InterviewsListComponent,
    AnswerInterviewComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntretienFeatureRoutingModule
  ],
  providers: [
    MessageService
  ]
})
export class EntretienFeatureModule { }
