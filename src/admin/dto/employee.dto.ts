import { IsEmail, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {

  @IsEmail()
  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Password',
    example: 'mysecretpassword',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Admin ID',
    example: 'admin123',
  })
  adminId: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Permissions',
    example: ['read', 'write', 'delete'],
  })
  perms: string[];
}