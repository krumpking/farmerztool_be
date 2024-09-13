import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEmail, IsEnum, IsArray, ArrayContains} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Full name of the user to be provided',
    example: 'Ronnie Kakunguwo',
    required: false
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
    required: false
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Position of the user',
    example: 'Farm Manager',
    required: false
  })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({
    description: 'Date the user joined',
    example: '2022-01-01',
    required: false
  })
  @IsString()
  @IsOptional()
  @Type(() => Date)
  dateJoined?: Date;

  @ApiProperty({
    description: 'Role of the user',
    example: 'Admin',
    required: false
  })
  @IsEnum(['Admin', 'Manager', 'Finance', 'Animal Manger', 'Crop Management'])
  @IsOptional()
  role?: 'Admin' | 'Manager' | 'Finance' | 'Animal Manger' | 'Crop Management';

  @ApiProperty({
    description: 'Permissions of the user',
    example: ['create', 'read', 'update', 'delete'],
    required: false
  })
  @IsArray()
  @ArrayContains(['create', 'read', 'update', 'delete'])
  @IsOptional()
  permissions?: string[];

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123'
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Farm area of the user',
    example: 'North Farm',
    required: false
  })
  @IsString()
  @IsOptional()
  farmArea?: string;

  @ApiProperty({
    description: "otp",
    example: "123456",
    required: false
  })
  @IsString()
  @IsOptional()
  otp?: string;

  @ApiProperty({
    description: "OTP expiring time",
    example: "2024-08-23-T14:00:00Z",
    required: false
  })
  @IsOptional()
  otpCreatedAt?: Date;
}