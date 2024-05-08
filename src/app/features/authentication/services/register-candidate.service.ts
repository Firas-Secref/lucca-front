import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterCandidateService {

  constructor(private http: HttpClient) { }

  register(candidate: any): Observable<any>{
    return this.http.post<any>(`aaaa`, candidate);
  }

  public addSkillsToCandidate(CandidateSkillObject: any): Observable<any>{
    return this.http.post<any>(`aaa`, CandidateSkillObject)
  }

}
