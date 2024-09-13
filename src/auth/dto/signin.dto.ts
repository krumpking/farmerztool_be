import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @ApiProperty({
    description: 'User email',
    example: 'ronnie@test.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  password: string;
}
