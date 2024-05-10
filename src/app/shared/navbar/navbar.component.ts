import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {ProfileService} from "../../features/main-feature/profile-feature/services/profile.service";
import {UserResponseDto} from "../../core/enpoints/response/UserResponseDto";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  stateMenu: boolean = false;
  helper = new JwtHelperService()
  fullName: string = "";

  managerRole = localStorage.getItem("role") ==="MANAGER";
  rhRole = localStorage.getItem("role") ==="RH";
  employeeRole = localStorage.getItem("role") ==="EMPLOYEE";

  name!: string;
  username!: string;

  currentUser!: UserResponseDto
  socket!: WebSocket;

  notificationsReq!: any[];

  constructor(private profileService: ProfileService) {
  }


  ngOnInit(): void {
    console.log('hi navbar')
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)

    this.getCurrentUser2();
    if(decodedJWT.roles[0] == "RH"){
    }


  }

  openMenu(){
    this.stateMenu = !this.stateMenu
  }

  getCurrentUser2(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    const username = decodedJWT.sub;
    this.profileService.getCurrentUser(username).subscribe(user=>{
        this.fullName= `${user.firstname} ${user.lastname}`
      console.log(this.fullName)
      this.currentUser = user
    })
  }

  getCurrentUser(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    const username = decodedJWT.sub;
    this.username = username;
    console.log(decodedJWT);
    if(decodedJWT.roles[0] =="Candidate"){
      // this.userService.getCurrentCandidate(username).subscribe((user: any)=>{
      //   console.log(user)
      //   localStorage.setItem("candidateId", user.candidateId)
      //   this.fullName= `Firas Secref`
      //   console.log(this.fullName   );
      //
      // })
    }else{
      // this.userService.getCurrentUser(username).subscribe((user: UserItem)=>{
      //   console.log(user)
      //   this.fullName= `${user.firstname} ${user.lastname}`
      // })
    }


  }


}
