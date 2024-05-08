import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InterviewRequestDto} from "../../../../core/enpoints/models/InterviewRequestDto";
import {Observable} from "rxjs";
import {endpoints} from "../../../../core/enpoints/endPoints";
import {$locationShim} from "@angular/common/upgrade";

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http: HttpClient) { }

  public saveInterview(interview: InterviewRequestDto): Observable<any>{
    return this.http.post<any>(`${endpoints.newInterview}`, interview)
  }

  public getAllInterviewByEmployee(employeeId: number): Observable<any[]>{
    return this.http.get<any[]>(`${endpoints.getInterviewsByEmployee}/${employeeId}`)
  }

  public getInterviewById(interviewId: number): Observable<any>{
    return this.http.get<any>(`${endpoints.getInterviewDetails}/${interviewId}`)
  }

  public addAnswerToQuestion(answer: any, questionId: number):Observable<any>{
    return this.http.post<any>(`${endpoints.addAnswerToQuestion}/${questionId}`, answer)
  }
  public completeInterview(interviewId: number):Observable<any>{
    return this.http.post<any>(`${endpoints.completeInterview}/${interviewId}`,{})
  }
}
