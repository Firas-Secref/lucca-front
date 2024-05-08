import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {HttpClient} from "@angular/common/http";

import {map, mergeMap} from "rxjs/operators";
import {DialogService} from "primeng/dynamicdialog";
import {TtRequestComponent} from "./tt-request/tt-request.component";
import {ProfileService} from "../../profile-feature/services/profile.service";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";
import {JwtHelperService} from "@auth0/angular-jwt";
import {RequestService} from "../../request-feature/services/request.service";
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent implements OnInit{

  constructor(private http: HttpClient, private dialogService: DialogService, private profileService: ProfileService, private requestService: RequestService) {
  }

  eventsDays: any[] = []
  public currentUser!: UserResponseDto;
  helper = new JwtHelperService();

  allRequestsEvents: any[] = []


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    themeSystem: 'sandstone',
    plugins: [dayGridPlugin, interactionPlugin],
    dayMaxEvents: 2,
    displayEventTime: true,
    selectable: true,
    contentHeight: 550,
    editable: true,
    eventClick: this.clickEvent.bind(this),
    select: this.addEventInterview.bind(this),
    eventDrop: this.updateDateEvent.bind(this),
    eventTimeFormat: {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit"
    }
  };

  ngOnInit(): void {
    this.getHomeOfficeRequests()
    this.getCurrentUser();
  }

  clickEvent(args: any){
    console.log(args)
  }

  addEventInterview(arg: any){
    const calendarApi = arg.view.calendar;
    calendarApi.unselect();
    this.dialogService.open(TtRequestComponent, {
      data: {
        'startDate': arg.startStr,
        'endDate': arg.endStr,
        'calendarApi': calendarApi,
        'currentUseId': this.currentUser.userId
      },
      height: '15rem',
      width: '50rem',

    }).onClose.subscribe(()=>{
      console.log("close")
    })
    console.log(arg)
  }

  updateDateEvent(){}

  getHomeOfficeRequests(){
    this.requestService.getOffDays().pipe(
      mergeMap(days=> {
        days.map(d=>{
          this.eventsDays.push({
            start: d.date,
            end: d.date,
            title: d.name,
            allDay: true,
            display: 'background',
            color: "#cce7e8"
          })
        })
        // this.calendarOptions.events = this.eventsDays
        return this.requestService.getAllHomeOfficeRequest().pipe(
          map(reqs=>{
            this.allRequestsEvents =
              reqs.map(req=>{
                if (req.statusDto.statusName !== "REFUSED"){
                  this.eventsDays.push({
                    start: req.startDate,
                    end: req.endDate,
                    allDay: true,
                    // display: 'background',
                    color: req.statusDto.statusColor,
                    title: `${req.userDto.firstname} ${req.userDto.lastname}: ${req.requestTitle}` ,
                  })
                }

              })
            this.calendarOptions.events = this.eventsDays

          })
        )
      })
    ).subscribe()
  }

  getCurrentUser(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    const username = decodedJWT.sub;
    this.profileService.getCurrentUser(username).subscribe(user=>{
      this.currentUser = user
    })
  }

  getAllRequests(){
    this.requestService.getRequestSentToRh().subscribe(requests=>{
      this.allRequestsEvents =
        requests.map(req=>{
          return {
            start: req.startDate,
            end: req.endDate,
            allDay: true,
            display: 'background',
            color: req.statusDto.statusColor,
            title: `${req.userDto.firstname} ${req.userDto.lastname}:\n ${req.requestTitle}` ,

          }
        })
    })
  }

}
