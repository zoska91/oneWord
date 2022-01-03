export interface ITodayWord {
  addLang: string;
  basicWord: string;
  createdDate: any;
  status: number;
  transWord: string;
  userId: string;
  wordId?: string;
}

export interface INotification {
  type: string;
  time: string;
}

export interface ISettings {
  id?: string;
  selectLanguage: string;
  isSummary: boolean;
  isBreak: boolean;
  notifications: INotification[];
  summaryDay: number;
  breakDay: number;
}

export interface wordAnswer {
  id: string;
  text: string;
}

export enum IlearnTypes {
  SHOW_WORD,
  INPUT,
  QUIZ,
  APPEAR,
}
