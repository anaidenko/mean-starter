import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { callbackify } from 'util';

import User from '../../../api/v1/user/models/user';
import { AuthJwtSecret } from '../../../config';
import { HttpError } from '../../errors';
import { UserTokenPayload } from '../UserToken';

const Strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromUrlQueryParameter('token'), ExtractJwt.fromAuthHeaderAsBearerToken()]),
    secretOrKey: AuthJwtSecret
  },
  callbackify(async (payload: UserTokenPayload) => {
    if (!payload) {
      throw new HttpError.Unauthorized('Authentication token missing');
    }
    if (!payload.userId || !payload.userType) {
      throw new HttpError.Unauthorized('Token invalid');
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      throw new HttpError.Unauthorized('Token invalid');
    }

    const expirationDate = new Date(payload.exp * 1000);
    if (expirationDate < new Date()) {
      throw new HttpError.Unauthorized('Token expired');
    }

    if (user.userType !== payload.userType) {
      throw new HttpError.Unauthorized('Token invalid');
    }

    return user;
  })
);

export default Strategy;
