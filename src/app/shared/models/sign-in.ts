import { IUserData } from "./settings";

export interface SignInResponse {
  token: string;
  user?: IUserData
}

export interface SignInRequest {
  password: string;
  email: string;
}
