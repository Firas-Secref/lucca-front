import {Component, OnInit} from '@angular/core';
import {InterviewService} from "../services/interview.service";
import {ActivatedRoute} from "@angular/router";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {TDocumentDefinitions} from "pdfmake/interfaces";
import {UserService} from "../../users-feature/services/user.service";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";
@Component({
  selector: 'app-interviews-list',
  templateUrl: './interviews-list.component.html',
  styleUrl: './interviews-list.component.scss'
})
export class InterviewsListComponent implements OnInit{

  interviews!: any[];
  userHasInterview!: UserResponseDto

  managerRole = localStorage.getItem("role") ==="MANAGER";
  rhRole = localStorage.getItem("role") ==="RH";
  employeeRole = localStorage.getItem("role") ==="EMPLOYEE";

  constructor(private interviewService: InterviewService, private route: ActivatedRoute, private userService: UserService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

  }
  ngOnInit(): void {
    console.log(Number(this.route.snapshot.paramMap.get('employeeId')))
    this.interviewService.getAllInterviewByEmployee(Number(this.route.snapshot.paramMap.get('employeeId'))).subscribe(interviews=>{
      console.log(interviews)
      this.interviews = interviews
    })
  }

  generatePdf(interview: any){
    this.userService.getUserById(interview?.userId).subscribe(user=>{
      pdfMake.createPdf(this.getDocumentDefinition(interview, user)).download()

    })
  }

  getDocumentDefinition(interview: any, user: UserResponseDto): TDocumentDefinitions{
    let allQuestionsAnswer: any[] = []
    interview.questions.forEach((q: any)=>{
      allQuestionsAnswer.push({question:q.question})
      allQuestionsAnswer.push({answer: q.answer})
    })

    return {
      content: [
        {
          text: 'Half-yearly Interview Summary',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: user.firstname + " " + user.lastname,
              bold: true,
              fontSize: 15,
              style: 'name'
            },
              {
                text: user.country
              },
              {
                text: user.address + " - " + user.city
              },
              {
                text: 'Email : ' + user.email,
              },

            ]
          ]
        },
        {
          text: 'Questions',
          bold: true,
          fontSize: 18,
          alignment: 'left',
          decoration: "underline",
          marginTop: 10,
          marginBottom: 10
        },
        ...allQuestionsAnswer.map((q: any)=>({
          text: q?.question ? `Question : ${q?.question}`: `==> ${q?.answer}`,
          marginBottom: q?.answer ? 8 : 2
        }))
      ],

    }
  }
}
