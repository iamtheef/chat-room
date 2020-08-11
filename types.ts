export interface Message {
  message: string;
  username?: string;
  sender?: string;
  receiver?: string;
}

export interface Messages {
  [id: string]: Message[] | [];
}

export interface Form {
  email: string;
  password: string;
  username?: string;
}
