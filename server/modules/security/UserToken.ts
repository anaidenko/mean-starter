import { IUser } from '../../api/v1/user/models/user';

export interface UserTokenPayload {
  userId: string;
  userType: string;
  exp?: number;
}

export interface UserToken {
  user: IUser;
  token: string;
}
