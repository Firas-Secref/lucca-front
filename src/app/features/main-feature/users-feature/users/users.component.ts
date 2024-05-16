import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {roles} from "../../../../core/canstants/canstants";
import {UserService} from "../services/user.service";
import {RegisterUserDto} from "../../../../core/enpoints/models/RegisterUserDto";
import {Observable} from "rxjs";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  usersList$!: Observable<UserResponseDto[]>
  helper = new JwtHelperService()
  username!: string
  confirmDeleteUserModal = false
  userToDelete!: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

  }

  ngOnInit(): void {
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    console.log(decodedJWT)
    const username = decodedJWT.sub;
    this.username = username
      this.initForm();
      this.newRole = { label: 'EMPLOYEE', value: roles.EMPLOYEE }
      this.usersList$ = this.userService.getAllUsers(username)
  }



  roleInfo = [
    { label: "RH", value: roles.RH },
    { label: 'MANAGER', value: roles.MANAGER },
    { label: 'EMPLOYEE', value: roles.EMPLOYEE },
  ];

  public newUserModal = false;

  newUserForm!: FormGroup;
  newRole: any;

  showModalDialog() {
    this.newUserModal = true;
  }

  initForm(){
    this.newUserForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',Validators.required],
      username: ['', Validators.required],
      password: [this.generateRandomPassword(),Validators.required],
      // department: [this.departmentOptions[0].value, Validators.required]
    })
  }

  generateRandomPassword(){
    let text: string = "";
    let possible = "ABCabcPQRSKNLMOYZTXhijUVdefgH([*Iklpmno#&qrstuvWDJwx0156!:yEF234Gz;?=)à@ç789^_è-|+";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text
  }

  submitForm() {
    const startDateArray = new Date().toLocaleDateString().split("/")

    console.log(this.newRole)

    const startDate = `${startDateArray[2]}-${startDateArray[0].padStart(2,"0")}-${startDateArray[1].padStart(2,"0")}`

    const newUser = new RegisterUserDto(
      this.newUserForm.value.username,
      this.newUserForm.value.password,
      this.newUserForm.value.firstname,
      this.newUserForm.value.lastname,
      this.newUserForm.value.email,
      "",
      "",
      "",
      startDate,
      this.newRole.roleName
    );


    this.userService.addNewUser(newUser).subscribe(userData=>{
      this.newUserForm.reset();
      this.usersList$ = this.userService.getAllUsers(this.username)
      this.newUserModal = false
    })
  }

  openModalConfirmDelete(userId: number) {
    this.confirmDeleteUserModal = true
    this.userToDelete = userId

  }

  deleteUser(){
    this.userService.deleteUser(this.userToDelete).subscribe(()=>{
      this.confirmDeleteUserModal = false
      this.usersList$ = this.userService.getAllUsers(this.username)
    }, error => {
      this.confirmDeleteUserModal = false
      this.usersList$ = this.userService.getAllUsers(this.username)
    })
  }
}
