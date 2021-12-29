export interface ITodayWord {
  addLang: string;
  basicWord: string;
  createdDate: any;
  status: number;
  transWord: string;
  userId: string;
  wordId?: string;
}

export interface ISettings {
  selectLanguage: string;
  isSummary: boolean;
  isBreak: boolean;
  notifications: { type: number; time: string }[];
  summaryDay: number;
  breakDay: number;
}
