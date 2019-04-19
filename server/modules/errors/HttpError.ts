import * as createError from 'http-errors';

createError.HttpError.prototype.extend = function(properties: any) {
  Object.assign(this, properties);
  return this;
};

export default createError;
