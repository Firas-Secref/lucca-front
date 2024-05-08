import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../services/profile.service";
import {UpdateUserRequestDto} from "../../../../core/enpoints/models/UpdateUserRequestDto";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  profileForm!: FormGroup;
  currentUsername!: string
  fullName = ""
  // JWT
  helper = new JwtHelperService();
  public currentUser!: UserResponseDto;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
  }

  initForm(){
    this.profileForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      department: ["", Validators.required],
      role: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      aboutMe: ["", Validators.required],
      postalCode: ["", Validators.required],
      country: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.initForm()
    this.getCurrentUser()
  }

  updateFormData(user: UserResponseDto){
    this.profileForm.patchValue({
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      department: "",
      role: "",
      address: user.address,
      city: user.city,
      aboutMe: "",
      postalCode: "",
      country: user.country,
    })
  }

  getCurrentUser(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    const username = decodedJWT.sub;
    this.currentUsername = username;
    this.profileService.getCurrentUser(username).subscribe((user: UserResponseDto)=>{
      this.updateFormData(user)
      this.currentUser = user
      this.fullName = `${user.firstname} ${user.lastname}`
    })
  }

  updateProfile() {
    // const userDetails = this.profileForm.value as UpdateUserRequestDto;
    const userDetails = new UpdateUserRequestDto(
      this.profileForm.value.username,
      this.profileForm.value.password,
      this.profileForm.value.firstname,
      this.profileForm.value.lastname,
      this.profileForm.value.email,
      this.profileForm.value.address,
      this.profileForm.value.city,
      this.profileForm.value.rolename,
      this.profileForm.value.startDate,
      this.profileForm.value.country,
      this.profileForm.value.departmentId
    )
    console.log(userDetails)
    this.profileService.updateUserDetails(userDetails, this.currentUsername).subscribe(user=>{
      console.log(user)
      this.updateFormData(user)
    })
  }
}
