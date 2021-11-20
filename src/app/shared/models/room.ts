export interface IRoom{
  id?: number;
  title: string;
  address: string;
  size: string;
  description: string;
  price: number;
  typeId: RoomType;
}

export interface IRoomSearchParams {
  roomType: string[]
}

export enum RoomType {
  Scare = 'Scare',
  Action = 'Action',
  Puzzle = 'Puzzle'
}