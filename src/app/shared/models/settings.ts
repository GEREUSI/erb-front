import { UserType } from "./user";

export interface IUserData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birthday: string;
  type: UserType;
}