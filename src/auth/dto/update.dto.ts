import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class UpdateOtp {
  @ApiProperty({
    description: "Email address of the user",
    example: "user@example.com",
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Full name of the user",
    example: "Ronnie Kakunguwo",
    required: false
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: "Phone number of the user",
    example: "+1234567890",
    required: false
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: "Position of the user",
    example: "Farm Manager",
    required: false
  })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({
    description: "Date the user joined",
    example: "2022-01-01",
    required: false
  })
  @IsString()
  @IsOptional()
  dateJoined?: string;

  @ApiProperty({
    description: "Role of the user",
    example: "Admin",
    required: false
  })
  @IsEnum(['Admin', 'Manager', 'Finance', 'Animal Manger', 'Crop Management'])
  @IsOptional()
  role?: 'Admin' | 'Manager' | 'Finance' | 'Animal Manger' | 'Crop Management';

  @ApiProperty({
    description: "Permissions of the user",
    example: ["create", "read", "update", "delete"],
    required: false
  })
  @IsArray()
  @IsOptional()
  permissions?: string[];

  @ApiProperty({
    description: "Farm area of the user",
    example: "North Farm",
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
}