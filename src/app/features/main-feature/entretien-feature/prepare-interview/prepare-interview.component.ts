import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../users-feature/services/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {InterviewService} from "../services/interview.service";
import {InterviewRequestDto} from "../../../../core/enpoints/models/InterviewRequestDto";
import {ProfileService} from "../../profile-feature/services/profile.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-prepare-interview',
  templateUrl: './prepare-interview.component.html',
  styleUrl: './prepare-interview.component.scss'
})
export class PrepareInterviewComponent implements OnInit{

  interviewForm !: FormGroup
  helper = new JwtHelperService();
  currentUser!: any
  usersList!: any[]

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private interviewService: InterviewService,
              private profileService: ProfileService,
              private toastService: MessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentUser();
    this.getAllUsers();
  }

  initForm(){
    this.interviewForm = this.formBuilder.group({
      employee: [null,[Validators.required]],
      interviewDescription: ["", [Validators.required]],
      period: [{value: this.getCurrentPeriod(), disabled: true}, [Validators.required]],
      questions: this.formBuilder.array([
        this.addQuestionFormGroup()
      ])
    })
  }

  addQuestionFormGroup(){
    return this.formBuilder.group({
      question: this.formBuilder.control("", Validators.required),
      answer: this.formBuilder.control("")
    })
  }
  get allQuestions() {
    return this.interviewForm.get('questions') as FormArray;
  }

  getCurrentPeriod(){
    return `${new Date().getFullYear()} - SEMESTER ${(new Date().getMonth()+1) / 6 <1 ? 1 : 2}`
  }

  addQuestion(){
    this.allQuestions.push(
      this.formBuilder.group({
        question: this.formBuilder.control("", Validators.required),
        answer: this.formBuilder.control("")
      })
    )
  }

  getCurrentUser(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    const username = decodedJWT.sub;
    this.profileService.getCurrentUser(username).subscribe(user=>{
      this.currentUser = user
    })
  }

  getAllUsers(){
    const jwt = localStorage.getItem('token')!;
    const decodedJWT = this.helper.decodeToken(jwt);
    const username = decodedJWT.sub;

    this.userService.getAllUsers(username).subscribe(users=>{
      this.usersList = users.map(user=>
         ({
          ...user,
          fullName: `${user.firstname} ${user.lastname}`
        })
      )
    })
  }

  submitInterviewForm() {
    const interviewRequestDto = new InterviewRequestDto(
      this.interviewForm.value.employee.userId,
      this.interviewForm.value.interviewDescription,
      this.interviewForm.value.period,
      this.interviewForm.value.questions)

    this.interviewService.saveInterview(interviewRequestDto).subscribe(interviewData=>{
      console.log(interviewData)
      if (interviewData){
        this.toastService.add({severity:'success', summary: 'Success', detail: "Interview Saved"});
        this.interviewForm.reset();

      }
    })
  }
}
