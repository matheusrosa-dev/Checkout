import { Role } from '../../users/enums/role.enum';

export interface ISession {
  userId: string;
  role: Role;
}
