import { SetMetadata } from '@nestjs/common';
import { Roles } from '../app/users/enums';

export const AllowedRoles = (allowedRoles: Roles[]) =>
  SetMetadata('allowed-roles', allowedRoles);
