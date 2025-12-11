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

export type TPriceCalculatorFormModel = {
  name: string;
  net: string;
  currency: string;
  vat: string;
};

export type TInputError = {
  [key: string]: string;
};

export type TPriceRequestBody = {
  name: string;
  net: number;
  currency: string;
  vat: number;
  totalAmount: number;
  vatAmount: number;
};

export type TPrice = TPriceRequestBody & { id: number; ip: string; createdAt: Date };

export type TPriceDataTable = {
  headers: string[];
  data: TPrice[];
};
