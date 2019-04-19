import * as mongoose from 'mongoose';

import * as constants from './constants';

export function init() {
  if (constants.DebugMongo) {
    mongoose.set('debug', true);
  }
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
}
