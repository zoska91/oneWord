interface answerWord {
  id: string;
  text: string;
}

export interface ITodaysWord {
  basicWord: string;
  transWord: string;
  addLang: string;
  correctAnswer: answerWord;
  createdDate?: any;
  randomWords: answerWord[];
  status: number;
  updateData?: any;
  userId: string;
  wordId: string;
}

export interface Istate {
  blockShowAnswerButton: boolean;
  blockSubmit: boolean;
  learnType: string;
  currentAnswer: number | string | null;
  isAnswerShow: boolean;
  todaysWord: ITodaysWord;
  closeLearn: boolean;
}
