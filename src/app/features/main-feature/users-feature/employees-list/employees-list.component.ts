import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit{

  managerRole = localStorage.getItem("role") ==="MANAGER";
  rhRole = localStorage.getItem("role") ==="RH";
  employeeRole = localStorage.getItem("role") ==="EMPLOYEE";

  helper = new JwtHelperService()
  allUsers$!: Observable<any[]>

  userDetailsDialog = false

  selectAllOrOnlyMines = [
    { label: "All Employees", value: "All Employees" },
    { label: 'My Employees', value: "My Employees" },
  ];

  public userDetails: any;
  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    const startDateArray = new Date().toLocaleDateString().split("/")

    const startDate = `${startDateArray[2]}-${startDateArray[0].padStart(2,"0")}-${startDateArray[1].padStart(2,"0")}`
    console.log(startDate)
    this.getAllEmployees()
  }

  getAllEmployees(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    console.log(decodedJWT)
    const username = decodedJWT.sub;
    this.allUsers$ = this.userService.getAllUsers(username).pipe(
      map(users=>
        users.map(user=>
           ({
            ...user,
            fullName: `${user.firstname} ${user.lastname}`
          })
        )
      ),
      tap(users=>console.log(users))
    );
  }

  openUserDetails(user: any){
    // this.userService.getUserByUsername(user.username).subscribe(user)
    this.userDetails = user
    console.log(user)
    this.userDetailsDialog = true;
  }



}
