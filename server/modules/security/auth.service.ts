import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken-promisified';
import * as passport from 'passport';
import { promisify } from 'util';

import User, { IUser } from '../../api/v1/user/models/user';
import { AuthJwtSecret } from '../../config';
import { HttpError } from '../errors';

import { UserToken, UserTokenPayload } from './UserToken';
import JwtStrategy from './strategies/passport-jwt';
import LocalStrategy from './strategies/passport-local';

const passportOptions: passport.AuthenticateOptions = { session: false };

class AuthService {
  constructor() {
    this.login = this.login.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  initialize() {
    passport.serializeUser((user: IUser, done) => {
      done(null, user._id.toString());
    });

    passport.deserializeUser((id: string, done) => {
      User.findById(id, done);
    });

    passport.use('local', LocalStrategy);
    passport.use('jwt', JwtStrategy);

    return passport.initialize();
  }

  async login(req: Request, res: Response, next?: NextFunction): Promise<UserToken> {
    const user = await this.passportAuth(req, res, next, 'local');
    await this.passportLogin(req, user);
    const token = await this.generateToken(user);
    if (next) {
      next();
    }
    return { user, token };
  }

  async authenticate(req: Request, res: Response, next?: NextFunction): Promise<IUser> {
    const user = await this.passportAuth(req, res, next, 'jwt');
    req.user = user;
    if (next) {
      next();
    }
    return user;
  }

  authorizeMiddleware(validate: (user: IUser) => boolean): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.passportAuth(req, res, next, 'jwt');
      const isValid = validate(user);
      if (!isValid) {
        throw new HttpError.Forbidden('You do not have access to this feature');
      }
      req.user = user;
      next();
    };
  }

  //
  // PRIVATE FUNCTIONS
  //

  private async passportLogin(req: Request, user: IUser): Promise<any> {
    const login = promisify(req.login);
    return login(user, passportOptions);
  }

  private async passportAuth(req: Request, res: Response, next: NextFunction, provider: string): Promise<IUser> {
    return new Promise((resolve: (data: any) => void, reject: (error: Error) => void) => {
      passport.authenticate(provider, passportOptions, (err: Error, data: IUser) => {
        if (err) {
          const httpError = new HttpError.Unauthorized(err && err.message).extend({ error: err });
          reject(httpError);
        } else {
          resolve(data);
        }
      })(req, res, next);
    });
  }

  private async generateToken(user: IUser): Promise<string> {
    const token: UserTokenPayload = {
      userId: user._id,
      userType: user.userType
    };
    const day = 24 * 60;
    return jwt.signAsync(token, AuthJwtSecret, { expiresIn: 7 * day });
  }
}

const authService = new AuthService();

export { authService };
