export enum QuizStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface Quiz {
  id: string;
  user_id: string;
  status: QuizStatus;
}
