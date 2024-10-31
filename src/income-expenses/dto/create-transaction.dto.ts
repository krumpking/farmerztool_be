import { IsNotEmpty, IsEnum, IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  
  @ApiProperty({ 
    description: 'The type of the transaction', 
    enum: ['Income', 'Expense', 'Asset'], 
    example: 'Income' 
  })
  @IsEnum(['Income', 'Expense', 'Asset'])
  @IsNotEmpty()
  type: string;

  @ApiProperty({ 
    description: 'The title of the transaction', 
    type: String, 
    example: 'Monthly Salary'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: 'The amount of the transaction', 
    type: Number, 
    example: 5000 
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ 
    description: 'The currency of the transaction', 
    type: String, 
    default: 'USD', 
    example: 'USD' 
  })
  @IsString()
  @IsOptional()
  currency?: string = 'USD';

  @ApiProperty({ 
    description: 'Additional details about the transaction', 
    type: String, 
    required: false, 
    example: 'Salary for the month of October' 
  })
  @IsString()
  @IsOptional()
  details?: string;

  @ApiProperty({ 
    description: 'The category of the transaction', 
    type: String, 
    example: 'salary'
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ 
    description: 'The date of the transaction', 
    type: Date, 
    default: new Date(), 
    example: '2023-10-01T00:00:00.000Z' 
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date = new Date();
}