import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';
import { Permission } from './permissions.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
export const Permissions = (...permissions: Permission[]) => SetMetadata('permissions', permissions);
