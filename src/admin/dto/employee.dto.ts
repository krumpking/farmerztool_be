import { IsEmail, IsString, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Roles {
  Admin,
  Manager,
  Finance,
  AnimalManager,
  CropManagement
}

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

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Permissions',
    example: ['read', 'write', 'delete'],
  })
  perms: string[];


  @IsString()
  @IsEnum(Roles)
  @ApiProperty({
    description: 'Role',
    example: 'Admin',
  })
  role: string;

}

