import { IUser } from './user';

export interface SignUpResponse {
  user: IUser;
  token: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
}
