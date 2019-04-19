import * as callbackify from 'callbackify';
import * as escapeStringRegex from 'escape-string-regexp';
import { Strategy as LocalStrategy } from 'passport-local';

import { default as User, IUser } from '../../../api/v1/user/models/user';
import { HttpError } from '../../../modules/errors';

const Strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  callbackify(
    async (email, password): Promise<IUser> => {
      if (!email) {
        throw new HttpError.BadRequest('Email not provided');
      }
      if (!password) {
        throw new HttpError.BadRequest('Password not provided');
      }

      const emailIgnoreCaseRegex = new RegExp('^' + escapeStringRegex(email) + '$', 'i');
      const user = await User.findOne({ email: emailIgnoreCaseRegex }).select('+password');
      if (!user) {
        throw new HttpError.Unauthorized('Incorrect email or password');
      }

      const passwordValid = await user.comparePassword(password);
      if (!passwordValid) {
        throw new HttpError.Unauthorized('Incorrect email or password');
      }

      return user;
    }
  )
);

export default Strategy;
