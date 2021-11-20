import { IUser, UserType } from './user';

export interface SignUpResponse {
  user: IUser;
}

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
  typeId: UserType
}
