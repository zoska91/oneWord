interface randomWord {
  id: number;
  text: string;
}

interface ITodaysWord {
  basicWord: string;
  transWord: string;
  correntAnswer: { id: number; text: string };
  randomWords: randomWord[];
}

export interface Istate {
  blockSubmit: boolean;
  learnType: string;
  currentAnswer: number | string | null;
  isAnswerShow: boolean;
  todaysWord: ITodaysWord;
}
