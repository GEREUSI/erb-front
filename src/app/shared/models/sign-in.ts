import { IUser } from './user';

export interface SignInResponse {
  user: IUser;
  token: string;
}

export interface SignInRequest {
  password: string;
  email: string;
}
