import { IUser } from "./user";

export interface SignInResponse {
  token: string;
  user?: IUser
}

export interface SignInRequest {
  password: string;
  email: string;
}
