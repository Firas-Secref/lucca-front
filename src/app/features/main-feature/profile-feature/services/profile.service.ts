import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UpdateUserRequestDto} from "../../../../core/enpoints/models/UpdateUserRequestDto";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";
import {endpoints} from "../../../../core/enpoints/endPoints";
import {a} from "@fullcalendar/core/internal-common";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public updateUserDetails(userDetails: UpdateUserRequestDto, username: string): Observable<UserResponseDto>{
    return this.http.post<UserResponseDto>(`${endpoints.updateUser}/${username}`, userDetails)
  }

  public getCurrentUser(username: string): Observable<UserResponseDto>{
    return this.http.get<UserResponseDto>(`${endpoints.getCurrentUser}/${username}`)
  }
}
