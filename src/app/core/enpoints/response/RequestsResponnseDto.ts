export interface RequestsResponseDto{
  requestId: number;
  requestTitle: string;
  requestDescription: string;
  urgent: boolean;
  startDate: string;
  endDate: string;
  userDto: any;
  statusDto: any;
  categoryDto: any;
}
