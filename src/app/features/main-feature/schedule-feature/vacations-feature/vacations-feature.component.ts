import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from "@fullcalendar/interaction";
import {RequestService} from "../../request-feature/services/request.service";
import {ProfileService} from "../../profile-feature/services/profile.service";
import {map, mergeMap, tap} from "rxjs/operators";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-vacations-feature',
  templateUrl: './vacations-feature.component.html',
  styleUrl: './vacations-feature.component.scss'
})
export class VacationsFeatureComponent implements OnInit{

  calendarOptions: CalendarOptions = {
    initialView: 'multiMonthYear',
    plugins: [multiMonthPlugin, interactionPlugin],
    dayMaxEvents: 2,
    displayEventTime: true,
    selectable: true,
    contentHeight: 550,
    editable: true,
    // eventClick: this.clickEvent.bind(this),
    // select: this.addEventInterview.bind(this),
    // eventDrop: this.updateDateEvent.bind(this),
    eventTimeFormat: {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit"
    }
  };

  eventsDays: any[] = []
  allRequestsEvents: any[] = []

  public currentUser!: UserResponseDto;
  helper = new JwtHelperService();

  constructor(private requestService: RequestService, private profileService: ProfileService) {

  }

  ngOnInit() {
    this.getCurrentUser();
    this.getOffDaysAndVacations();
  }

  getCurrentUser(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    const username = decodedJWT.sub;
    this.profileService.getCurrentUser(username).subscribe(user=>{
      this.currentUser = user
    })
  }

  getOffDaysAndVacations(){
    this.requestService.getOffDays().pipe(
      mergeMap(days=> {
        days.map(d=>{
          console.log(d.date)
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
        return this.requestService.getAllEmployeesHolidays().pipe(
          map(reqs=>{
            console.log(reqs)
              reqs.map(req=>{
                this.eventsDays.push({
                  start: req.startDate,
                  end: req.endDate,
                  allDay: true,
                  // display: 'background',
                  color: req.statusDto.statusColor,
                  title: `${req.userDto.firstname} ${req.userDto.lastname}: ${req.requestTitle}` ,
                })
              })
            this.calendarOptions.events = this.eventsDays

          })
        )
      })
    ).subscribe()
  }



}
