import { Role } from "./role.enum";

export const rolePermissions = {
    [Role.Admin]: ['create:animal', 'read:animal', 'update:animal', 'delete:animal'],
}