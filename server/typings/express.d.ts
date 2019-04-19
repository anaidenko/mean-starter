import { IUser } from '../api/v1/user/models/user';

declare module 'express' {
  export interface Request {
    user?: IUser;
  }
}
