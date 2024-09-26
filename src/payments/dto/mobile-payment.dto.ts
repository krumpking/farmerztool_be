import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateMobilePaymentDto {
  @ApiProperty({
    description: 'The ID of the admin who created the payment',
    example: 'admin123',
  })
  @IsString()
  adminId: string;

  @ApiProperty({
    description: 'The amount of the payment',
    example: 100.00,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'A brief description of the payment',
    example: 'Payment for services rendered',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The phone number associated with the payment',
    example: '+1234567890',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'The URL of the poll associated with the payment',
    example: 'https://example.com/poll',
  })
  @IsUrl()
  pollUrl: string;
}