export class InterviewRequestDto{
  userId: number;
  interviewDescription: string;
  period: string;
  questions: any[]


  constructor(userId: number, interviewDescription: string, period: string, questions: any[]) {
    this.userId = userId;
    this.interviewDescription = interviewDescription;
    this.period = period;
    this.questions = questions;
  }
}
