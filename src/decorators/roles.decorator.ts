import { SetMetadata } from '@nestjs/common';
import { Role } from '../app/users/enums';

export const Roles = (allowedRoles: Role[]) =>
  SetMetadata('allowed-roles', allowedRoles);
