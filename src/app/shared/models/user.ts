export interface IUser {
  _id: string;
  email: string;
  password: string;
  username: string;
  type: UserType;
  salt: string;
}

export enum UserType {
  Renter = 'RENTER',
  Tenant = 'Tenant',
}
