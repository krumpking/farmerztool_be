import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber,Min, Max, IsEmail, Matches } from 'class-validator';


export class CreateContactDto {
  @ApiProperty({
    description: 'The name of the contact',
    example: 'John Doe'
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The type of contact',
    example: "customer"
  })
  @IsString()
  contactType: string;

  @ApiProperty({
    description: 'The email address of the contact',
    required: false,
    example: 'john.doe@example.com'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The phone number of the contact',
    required: false,
    example: '+1234567890'
  })
  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' })
  phoneNumber?: string;

  @ApiProperty({
    description: 'The WhatsApp number of the contact',
    required: false,
    example: '+1234567890'
  })
  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid WhatsApp number format' })
  whatsappNumber?: string;

  @ApiProperty({
    description: 'The city of the contact',
    required: false,
    example: 'New York'
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'The state or province of the contact',
    required: false,
    example: 'New York'
  })
  @IsOptional()
  @IsString()
  stateProvince?: string;

  @ApiProperty({
    description: 'The country of the contact',
    required: false,
    example: 'United States'
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'The rating of the contact (1-5)',
    required: false,
    minimum: 1,
    maximum: 5,
    example: 4
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}