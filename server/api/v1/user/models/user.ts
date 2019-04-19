import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as mongooseUniqueValidator from 'mongoose-unique-validator';
import { promisify } from 'util';

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

export interface IUser extends mongoose.Document {
  email: string;
  password?: string;
  active: boolean;
  userType: 'user' | 'manager' | 'admin';

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserStatics {
  hashPassword(password: string): Promise<string>;
}

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    active: { type: Boolean },
    userType: { type: String, enum: ['user', 'manager', 'admin'] }
  },
  { usePushEach: true }
);

const hashAsync = promisify(bcrypt.hash);

// tslint:disable-next-line:only-arrow-functions
schema.statics.hashPassword = function(password: string): Promise<string> {
  return hashAsync(password, SALT_WORK_FACTOR);
};

schema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
  const password = this.password;
  return new Promise((resolve, reject) => {
    // bcrypt.compare to avoid counters timing attacks (using a so-called 'constant-time' algorithm).
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) {
        reject(err);
      } else {
        resolve(success);
      }
    });
  });
};

schema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password; // cloak
  return obj;
};

schema.plugin(mongooseUniqueValidator);

type UserModelType = mongoose.Model<IUser> & IUserStatics;

const User = mongoose.model<IUser, UserModelType>('User', schema);

export default User;
