import { Role } from '../../users/enum/role.enum';

export interface ISession {
  userId: string;
  role: Role;
}
