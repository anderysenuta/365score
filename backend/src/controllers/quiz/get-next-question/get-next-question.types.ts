export interface QuestionOption {
  id: string;
  value: string;
}

export interface NextQuestion {
  id: string;
  question_text: string;
  question_order: number;
  options: QuestionOption[];
}
