import { IUser } from './iuser';

export interface SignInResponse {
  user: IUser;
  token: string;
}

export interface SignInRequest {
  password: string;
  email: string;
}
