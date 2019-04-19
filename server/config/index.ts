import * as db from './db';

export * from './constants';

export function init() {
  db.init();
}
