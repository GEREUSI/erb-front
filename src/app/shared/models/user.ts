export interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  typeId: UserType;
}

export enum UserType {
  Renter = 'renter',
  Tenant = 'tenant',
}
