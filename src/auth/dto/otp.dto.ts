import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsString } from "class-validator";

export class Otp {
  @ApiProperty({
    description: "Email address of the user",
    example: "user@example.com",
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "One-time password",
    example: "123456",
    required: true
  })
  @IsString()
  otp: string;

  @ApiProperty({
    description: "OTP expiring time",
    example: "2024-08-23-T14:00:00Z",
    required: true
  })
  @IsDate()
  expiresAt: Date;
}