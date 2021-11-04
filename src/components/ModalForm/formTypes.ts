export interface IInputsAddWord {
  basicWord: string;
  transWord: string;
  lang: string;
}

interface ISingleNotification {
  type: string;
  time: string;
}

export interface IInputsPreferences {
  notifications: ISingleNotification[];
  lang: string;
  summary: ['week', 'month', 'none'];
}
