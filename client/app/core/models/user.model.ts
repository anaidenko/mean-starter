export interface User {
  _id: string;
  email: string;
  password?: string;
  role: string;
  firstname: string;
  lastname: string;
  registered?: Date;
  last_updated?: Date;
  active?: boolean;
}

export interface UserMetadata {
  _id?: string;
  email?: string;
  password?: string;
  role?: string;
  firstname?: string;
  lastname?: string;
}
