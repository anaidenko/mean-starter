import * as dotenv from './dotenv';

dotenv.init(); // loads environment variables from a .env file into process.env.

export const Env: string = process.env.NODE_ENV || 'development';
export const Port: number = Number(process.env.PORT) || 3000;
export const Debug: boolean = process.env.DEBUG === 'true';
export const DebugMongo: boolean = process.env.DEBUG_MONGO === 'true';

export const ServerUrl: string = process.env.SERVER_URL || '';
export const MongoUrl: string = process.env.MONGO_URL || '';
export const AuthJwtSecret: string = process.env.AUTH_JWT_SECRET || '';
