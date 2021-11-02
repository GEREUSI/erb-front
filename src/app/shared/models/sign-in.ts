export interface SignInResponse {
  token: string;
}

export interface SignInRequest {
  password: string;
  email: string;
}
