import { IUser } from "./user";

export interface IRoom{
  id?: number;
  title: string;
  address: string;
  size: string;
  description: string;
  price: number;
  typeId: RoomType;
  avgRate: string;
}

export interface IRoomReservation{
  id: number;
  reservation_date: string;
  status: RoomReservationStatus
  user?: IUser;
  room?: IRoom;
}

export interface ISingleRoomResponse {
  room: IRoom
}

export interface IRoomResponse {
  rooms: IRoom[]
}

export interface IRoomSearchParams {
  roomType: string[];
  ratingFrom?: number;
  ratingTo?: number
}

export enum RoomType {
  Scare = 'Scare',
  Action = 'Action',
  Puzzle = 'Puzzle'
}

export enum RoomReservationStatus {
  InProgress = 'in_progress',
  Cancelled = 'canceled',
  Confirmed = 'confirmed'
}

export interface IRoomRateParams {
  user_id: number,
  rate: number
}

export interface IRoomReserveParams {
  user_id: number,
  reservation_date: string
}