import { RolesEnum } from 'src/domain/authorization/roles.enum';

export interface IUserBody {
  username: string;
  password: string;
}

export interface IUser extends IUserBody {
  id: number;
}

export interface IUserLogged {
  id: number;
  username: string;
}

export type IUserCreate = IUserBody;
