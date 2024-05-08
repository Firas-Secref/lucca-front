import {Component, Input, OnInit} from '@angular/core';
import {requestStatusFilterDropDown} from "../../../../../core/canstants/canstants";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-request-menu-status',
  templateUrl: './request-menu-status.component.html',
  styleUrl: './request-menu-status.component.scss'
})
export class RequestMenuStatusComponent implements OnInit{
  @Input()request!: any;
  statusOptions: any[] = requestStatusFilterDropDown;


  constructor(private requestService: RequestService) {
  }
  ngOnInit(): void {
  }

  selectState(state: any) {
    console.log(state)
    console.log(this.request)
    this.requestService.changeRequestState(this.request.requestId, state.statusId).subscribe(state=>{
      console.log(state)
      this.request.statusDto.statusColor = state.statusColor;
    })

  }
}
