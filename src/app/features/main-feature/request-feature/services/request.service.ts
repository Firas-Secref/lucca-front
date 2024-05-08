import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestDto} from "../../../../core/enpoints/models/RequestDto";
import {Observable, of} from "rxjs";
import {endpoints, holidays_api} from "../../../../core/enpoints/endPoints";
import {RequestsResponseDto} from "../../../../core/enpoints/response/RequestsResponnseDto";
import {Status} from "../../../../core/model/Status";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public addNewRequest(requestDto: RequestDto): Observable<RequestsResponseDto>{
    return this.http.post<RequestsResponseDto>(`${endpoints.addNewRequest}`, requestDto)
  }

  public getMyRequests(employeeId: number): Observable<RequestsResponseDto[]>{
    return this.http.get<RequestsResponseDto[]>(`${endpoints.getMyRequests}/${employeeId}`)
  }

  public getRequestSentToRh(): Observable<RequestsResponseDto[]>{
    return this.http.get<RequestsResponseDto[]>(`${endpoints.getRequestSentToRh}`)
  }

  public getMyEmployeeRequest(managerId: number): Observable<RequestsResponseDto>{
    return this.http.get<RequestsResponseDto>(`${endpoints.getMyEmployeeRequests}/${managerId}`)
  }

  public getAllHolidaysRequest():Observable<any[]>{
    return of([])
  }

  public getHomeOfficeRequests():Observable<any[]>{
    return of([])
  }

  public getOffDays(){
    return this.http.get<any[]>(holidays_api(new Date().getFullYear()));
  }

  public getAllEmployeesHolidays(){
    return this.http.get<RequestsResponseDto[]>(`${endpoints.getAllEmployeesHolidays}`)
  }

  public changeRequestState(requestId: number, statusId: number): Observable<Status>{
    return this.http.post<Status>(`${endpoints.changeRequestStatus}`, {requestId: requestId, statusId: statusId})
  }

  public getAllHomeOfficeRequest(): Observable<RequestsResponseDto[]>{
    return this.http.get<RequestsResponseDto[]>(`${endpoints.getAllHomeOfficeRequests}`)

  }

}
