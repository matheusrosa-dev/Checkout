import { Roles } from '../../users/enums';

export interface ISession {
  userId: string;
  role: Roles;
}
