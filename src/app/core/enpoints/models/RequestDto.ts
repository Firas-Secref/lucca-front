export class RequestDto{
  requestTitle: string;
  requestDescription: string;
  urgent: boolean;
  startDate: string;
  endDate: string;
  userId: number;
  statusId: number;
  categoryId: number;


  constructor(requestTitle: string, requestDescription: string, urgent: boolean, startDate: string, endDate: string, userId: number, statusId: number, categoryId: number) {
    this.requestTitle = requestTitle;
    this.requestDescription = requestDescription;
    this.urgent = urgent;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;
    this.statusId = statusId;
    this.categoryId = categoryId;
  }
}
