import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

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
}