import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  categories,
  days,
  months,
  requestStatusFilterDropDown,
  status,
  years
} from "../../../../core/canstants/canstants";
import {RequestService} from "../services/request.service";
import {RequestDto} from "../../../../core/enpoints/models/RequestDto";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ProfileService} from "../../profile-feature/services/profile.service";
import {switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {SelectButtonOptionClickEvent} from "primeng/selectbutton";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class RequestComponent implements OnInit{


  managerRole = localStorage.getItem("role") ==="MANAGER";
  rhRole = localStorage.getItem("role") ==="RH";
  employeeRole = localStorage.getItem("role") ==="EMPLOYEE";

  displayModal = false;
  requestForm!: FormGroup;
  statusOptions = requestStatusFilterDropDown;
  requests: any[] = [];
  displayedRequest: any[] = [];
  categoryInfo = [
    { label: "Congé payé", value: categories.PAID_HOLIDAY },
    { label: 'Congé maladie', value: categories.MEDICAL_LEAVE },
    { label: 'AUTRE', value: categories.OTHER },
  ];

  requestOptions = [
    { label: "Demandes Urgentes", value: "Urgent_Requests" },
    { label: "Demandes télétravail", value: "Home_Office_Requests" },
    { label: 'Demandes de congé', value: "Vacation_Request" },
    { label: 'Autre demandes', value: "Other_Request" },
  ];

  requestCategory: any
  helper = new JwtHelperService();

  private currentUser!: UserResponseDto;

  constructor(private fb: FormBuilder, private requestService: RequestService, private profileService: ProfileService, private toastService: MessageService) {
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("role"))
    this.initForm();
    this.getCurrentUser()
  };

  showModalDialog() {
    this.displayModal = true;
  }

  initForm(){
    this.requestForm = this.fb.group({
      requestTitle: ["", Validators.required],
      requestDescription: ["", Validators.required],
      holidayPeriod: [[]],
      urgent: [false],
    })
  }

  public submitRequestForm(){
    let startDate: string
    let endDate: string
  if(this.requestForm.value.holidayPeriod.length !==0){

    const startDateArray = new Date(this.requestForm.value.holidayPeriod[0]).toLocaleDateString().split("/")
    startDate = `${startDateArray[2]}-${startDateArray[0].padStart(2,"0")}-${startDateArray[1].padStart(2,"0")}`

    const endDateArray = new Date(this.requestForm.value.holidayPeriod[1]).toLocaleDateString().split("/")
    endDate = `${endDateArray[2]}-${endDateArray[0].padStart(2,"0")}-${endDateArray[1].padStart(2,"0")}`
  }else {
    endDate = "";
    startDate = ""
  }

    const newRequest = new RequestDto(
      this.requestForm.value.requestTitle,
      this.requestForm.value.requestDescription,
      this.requestForm.value.urgent,
      this.requestForm.value.holidayPeriod.length !==0 ? startDate : "",
      this.requestForm.value.holidayPeriod.length !==0? endDate : "",
      this.currentUser.userId,
      status.NEW.statusId,
      !this.requestCategory ? 3 :this.requestCategory.categoryId
    )

    console.log(newRequest)

    this.requestService.addNewRequest(newRequest).subscribe(req=>{
      console.log(req)
      this.requestForm.reset();
      this.getCurrentUser()
      this.displayModal = false
      this.toastService.add({severity:'success', summary: 'Success', detail: "Request sent !"});

    })
  }

  getCurrentUser(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    const username = decodedJWT.sub;

    this.profileService.getCurrentUser(username).pipe(
      switchMap(user=>{
        this.currentUser = user
        if (user.roleName === "RH"){
          return this.requestService.getRequestSentToRh().pipe(
            map(allRequests=>{
              console.log(allRequests)
              this.requests = allRequests;
              this.displayedRequest = allRequests
            })
          )
        }
        return this.requestService.getMyRequests(user.userId).pipe(
          map(myRequests=>{
            console.log(myRequests)
            this.requests = myRequests
            this.displayedRequest = myRequests
          })
        )
      })
    ).subscribe()
  }


  filterList($event: SelectButtonOptionClickEvent) {
    switch ($event.option.value) {
      case "Urgent_Requests": this.requests = this.displayedRequest.filter(req=> req.urgent == true); break;
      case "Home_Office_Requests": this.requests = this.displayedRequest.filter(req=> req.categoryDto.categoryName === "HOME OFFICE"); break;
      case "Other_Request": this.requests = this.displayedRequest.filter(req=> req.categoryDto.categoryName === "OTHER"); break;
      case "Vacation_Request": this.requests = this.displayedRequest.filter(req=> req.categoryDto.categoryName === "PAID VACATION" || req.categoryDto.categoryName === "MEDICAL LEAVE"); break;
    }
  }
}
