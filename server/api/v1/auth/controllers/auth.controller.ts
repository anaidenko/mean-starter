import { Request, Response } from 'express';

import { HttpError } from '../../../../modules/errors';
import { authService } from '../../../../modules/security';
import User from '../../user/models/user';

export async function signup(req: Request, res: Response) {
  // check if email and password is provided, otherwise respond with error
  if (!req.body.email || !req.body.password) {
    throw new HttpError.BadRequest('Check user email/password entered');
  }

  // create new instance of user
  const user = new User({
    email: req.body.email,
    password: await User.hashPassword(req.body.password),
    active: true,
    userType: 'user'
  });

  // save user to database
  await user.save();

  return user;
}

export async function login(req: Request, res: Response) {
  const { user, token } = await authService.login(req, res);
  if (!user || !token) {
    throw new HttpError.Unauthorized('Invalid login information');
  }

  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress).toString().split(',')[0];

  // check if user is activated
  if (!user.active) {
    throw new HttpError.Unauthorized('User is inactive.');
  }

  const result = {
    token,
    user,
    ip
  };

  return result;
}
