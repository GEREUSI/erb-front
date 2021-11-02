import { UserType } from "./user";

export interface IUserSettings {
  user: IUserData
}

export interface IUserData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birthdayDate: string;
  typeId: UserType;
}