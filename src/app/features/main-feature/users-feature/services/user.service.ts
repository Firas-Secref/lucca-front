import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {endpoints} from "../../../../core/enpoints/endPoints";
import {RegisterUserDto} from "../../../../core/enpoints/models/RegisterUserDto";
import {UserResponseDto} from "../../../../core/enpoints/response/UserResponseDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public addNewUser(newUserDto: RegisterUserDto): Observable<any>{
    return this.http.post<any>(endpoints.register, newUserDto)
  }

  public getAllUsers(username: string):Observable<UserResponseDto[]>{
    return this.http.get<UserResponseDto[]>(`${endpoints.getAllUsers}/${username}`)
  }

  public getMyEmployees(username: string):Observable<UserResponseDto[]>{
    return this.http.get<UserResponseDto[]>(`${endpoints.getAllUsers}/${username}`)
  }

  public getUserByUsername(username: string):Observable<UserResponseDto>{
    return this.http.get<UserResponseDto>(`${endpoints.getUserDetails}/${username}`)
  }
  public getUserById(userId: number):Observable<UserResponseDto>{
    return this.http.get<UserResponseDto>(`${endpoints.getUserById}/${userId}`)
  }

  public addNoteToEmployee(noteObject: any): Observable<any>{
    return this.http.post<any>(`${endpoints.addNoteToEmployee}`, noteObject)
  }
}