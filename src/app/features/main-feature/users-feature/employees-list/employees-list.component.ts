import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {filter, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {FormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit{

  managerRole = localStorage.getItem("role") ==="MANAGER";
  rhRole = localStorage.getItem("role") ==="RH";
  employeeRole = localStorage.getItem("role") ==="EMPLOYEE";
  feedBacks = false
  feedRhBackForm!: UntypedFormGroup;
  feedTechBackForm!: UntypedFormGroup;

  rhFeedbacksForCandidate!: any[]
  techFeedbacksForCandidate!: any[]
  candidateNameFeedBack!: any;


  helper = new JwtHelperService()
  allUsers$!: Observable<any[]>

  userDetailsDialog = false

  selectAllOrOnlyMines = [
    { label: "All Employees", value: "All Employees" },
    { label: 'My Employees', value: "My Employees" },
  ];

  public userDetails: any;
  private employeeIdToDisplayFeedBack!: number;
  public username!: string;

  initRHFeedBackForm(){
    this.feedRhBackForm =this.fb.group({
      feedBackText: [""]
    })
  }

  initTechnicalFeedBackForm(){
    this.feedTechBackForm =this.fb.group({
      feedBackText: [""]
    })
  }
  constructor(private userService: UserService, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    const startDateArray = new Date().toLocaleDateString().split("/")

    const startDate = `${startDateArray[2]}-${startDateArray[0].padStart(2,"0")}-${startDateArray[1].padStart(2,"0")}`
    console.log(startDate)
    this.getAllEmployees()
    this.initTechnicalFeedBackForm()
    this.initRHFeedBackForm()
  }

  getAllEmployees(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    console.log(decodedJWT)
    const username = decodedJWT.sub;
    this.username = username;
    this.allUsers$ = this.userService.getAllUsers(username).pipe(
      map(users=> {
        if(this.managerRole){
          return users.filter(user=>user.roleName === "EMPLOYEE").map(
            user =>
              ({
                ...user,
                fullName: `${user.firstname} ${user.lastname}`
              })
          )
        }
          return users.map(user =>
            ({
              ...user,
              fullName: `${user.firstname} ${user.lastname}`
            })
          )
        }
      ),
      tap(users=>console.log(users)),
    );
  }

  openUserDetails(user: any){
    // this.userService.getUserByUsername(user.username).subscribe(user)
    this.userDetails = user
    console.log(user)
    this.userDetailsDialog = true;
  }


  submitRhFeedBack() {
    const feedBack = {
      feedBackText: this.feedRhBackForm.value.feedBackText,
      userId: this.employeeIdToDisplayFeedBack,
      feedBackType: "RH"
    }

    this.userService.addFeedBack(feedBack).subscribe((data: any)=>{
      console.log(data);
      console.log("feddBack added !");
      this.feedRhBackForm.reset();
      this.getCandidateFeedBacks(this.employeeIdToDisplayFeedBack)

    })
  }

  submitTechFeedBack() {
    const feedBack = {
      feedBackText: this.feedTechBackForm.value.feedBackText,
      userId: this.employeeIdToDisplayFeedBack,
      feedBackType: "Tech"
    }

    this.userService.addFeedBack(feedBack).subscribe((data: any)=>{
      console.log(data);
      console.log("feddBack added !");
      this.feedTechBackForm.reset()
      this.getCandidateFeedBacks(this.employeeIdToDisplayFeedBack)

    })
  }


  displayFeedBacks(employee: any){
    this.feedBacks = true
    console.log(employee)
    this.candidateNameFeedBack = `${employee.firstname} ${employee.lastname}`
    this.employeeIdToDisplayFeedBack = employee.userId;
    this.getCandidateFeedBacks(employee.userId)
  }

  getCandidateFeedBacks(employeeId: number){
    this.userService.getEmployeeFeedBacks(employeeId).subscribe((data: any[])=>{
      console.log(data);
      this.rhFeedbacksForCandidate = data.filter(fb=> fb.feedBackType == "RH");
      this.techFeedbacksForCandidate = data.filter(fb=> fb.feedBackType == "Tech");

    })
  }
}
