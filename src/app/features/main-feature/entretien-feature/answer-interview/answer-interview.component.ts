import {Component, OnInit} from '@angular/core';
import {InterviewService} from "../services/interview.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-answer-interview',
  templateUrl: './answer-interview.component.html',
  styleUrl: './answer-interview.component.scss'
})
export class AnswerInterviewComponent implements OnInit{

  interviewDetails!: any
  constructor(private interviewService: InterviewService, private router: Router, private route: ActivatedRoute, private toastService: MessageService) {
  }
  ngOnInit(): void {
    this.getInterviewById()
  }

  getInterviewById(){
    this.interviewService.getInterviewById(Number(this.route.snapshot.paramMap.get('interviewId'))).subscribe(interview=>{
      console.log(interview)
      this.interviewDetails = interview;
    })
  }

  submitNewAnswer($event: Event, questionId: number) {
    const element = $event.target as HTMLTextAreaElement
    console.log(element.value)
    this.interviewService.addAnswerToQuestion({answer: element.value}, questionId).subscribe(question=>{
      console.log(question)
    })
  }

  completeInterview(interviewId: any, employeeId: number) {
    this.interviewService.completeInterview(interviewId).subscribe(interview=>{
      console.log(interview)
      this.toastService.add({severity:'success', summary: 'Success', detail: "Interview Done"});
      setTimeout(()=>{
        this.router.navigateByUrl("/annualInterview/list/employee/"+employeeId)
      }, 1000)

    })
  }
}
