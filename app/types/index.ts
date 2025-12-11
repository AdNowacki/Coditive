export enum INPUT_TYPES_ENUM {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url',
  DATE = 'date',
  DATETIME_LOCAL = 'datetime-local',
  TIME = 'time',
  WEEK = 'week',
  MONTH = 'month',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  FILE = 'file',
  HIDDEN = 'hidden',
  SUBMIT = 'submit',
  RESET = 'reset',
  BUTTON = 'button',
}

export type TOptions<T> = {
  value: T;
  label: string;
};
