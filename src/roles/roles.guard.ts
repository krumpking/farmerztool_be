import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { Permission } from './permissions.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        const permissions = this.reflector.get<Permission[]>('permissions', context.getHandler());
        if (!roles && !permissions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Check if user has at least one of the allowed roles
        const hasRole = roles ? roles.some(role => user.role.includes(role)) : true;

        // Check if user has at least one of the required permissions
        const hasPermission = permissions ? permissions.some(permission => user.permissions.includes(permission)) : true;

        // If there are permissions to check
        if (roles && !roles.some(role => user.role.includes(role))) {
            throw new ForbiddenException('Sorry, you don’t have the right role to access this resource.');
        }

        // If there are permissions to check
        if (permissions && !permissions.every(permission => user.permissions.includes(permission))) {
            throw new ForbiddenException('You don’t have the required permissions for this action.');
        }

        return hasRole && hasPermission;
    }
}
