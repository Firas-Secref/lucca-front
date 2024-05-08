import { Component } from '@angular/core';
import {UntypedFormGroup} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserResponseDto} from "../../../../../core/enpoints/response/UserResponseDto";
import {RequestDto} from "../../../../../core/enpoints/models/RequestDto";
import {RequestService} from "../../../request-feature/services/request.service";

@Component({
  selector: 'app-tt-request',
  templateUrl: './tt-request.component.html',
  styleUrl: './tt-request.component.scss'
})
export class TtRequestComponent {

  reqStartDate: string;
  reqEndDate: string;
  currentUserId: number;
  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogService: DynamicDialogConfig, private requestService: RequestService
  ) {
    this.reqStartDate = this.dialogService.data.startDate
    this.reqEndDate = this.dialogService.data.endDate
    this.currentUserId = this.dialogService.data.currentUseId
  }

  close(){
    this.dialogRef.close();
  }

  submitRemoteReq(){

    const ttRequest = new RequestDto(
      "HOME OFFICE REQUEST",
      "HOME OFFICE REQUEST",
      false,
      this.reqStartDate,
      this.reqEndDate,
      this.currentUserId,
      1,
      4
    )

    this.requestService.addNewRequest(ttRequest).subscribe(req=>{
      console.log(req)
      this.dialogService.data.calendarApi.addEvent(
        {
          title: `${req.userDto.firstname} ${req.userDto.lastname}: ${req.requestTitle}` ,
          start: req.startDate,
          end: req.endDate,
          allDay: true,
          // display: 'background',
          color: req.statusDto.statusColor,
        }
      )
      this.dialogRef.close();
    })

    // this.dialogService.data.calendarApi.addEvent({
    //   title: `${this.interviewForm.value.interviewSubject.title} (${newInterview.candidateName})`,
    //   start: newInterview.interviewDate+`T${newInterview.interviewHour}:00`
    // })

  }



}
