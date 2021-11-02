import { IUser } from './user';

export interface SignUpResponse {
  user: IUser;
}

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
}
