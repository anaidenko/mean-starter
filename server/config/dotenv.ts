import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export function init() {
  return load(`.env.${process.env.NODE_ENV}`) || load(`.env`) || console.warn(`.env file not found`);
}

function load(envFile) {
  const envPath = path.resolve(process.cwd(), '..', envFile);
  if (!fs.existsSync(envPath)) {
    return false;
  }

  const result = dotenv.config({ path: envPath });

  if (result.error) {
    console.error('Dotenv failed', result.error);
    throw result.error;
  }

  console.log(`Environment variables loaded from ${envFile}`);
  return result;
}
