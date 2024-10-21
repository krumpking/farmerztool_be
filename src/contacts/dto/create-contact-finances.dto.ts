import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ItemDto {
  @ApiProperty({ example: 'Apples', description: 'The name of the item being purchased.' })
  @IsNotEmpty()
  @IsString()
  itemName: string;

  @ApiProperty({ example: 1.5, description: 'The price per unit of the item.' })
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ example: 10, description: 'The total quantity of the item purchased.' })
  @IsNotEmpty()
  @IsNumber()
  numberOfItems: number;
}

export class CreateFinancialActivityDto {

  @ApiProperty({ type: [ItemDto], description: 'A list of items that were purchased in this transaction.', required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  itemsBought?: ItemDto[];

  @ApiProperty({ type: [ItemDto], description: 'A list of items that were supplied in this transaction.', required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  itemsSupplied?: ItemDto[];

  @ApiProperty({ example: 'Goats purchased', description: 'Details about the transaction itself.' })
  @IsNotEmpty()
  @IsString()
  transactionDetails: string;

  @ApiProperty({ example: 150.75, description: 'The total amount of money involved in the transaction.' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'receipt12345', description: 'A reference number or code for the receipt of the transaction.' })
  @IsNotEmpty()
  @IsString()
  receipt: string;

  @ApiProperty({ example: 'Payment for apples', description: 'A brief explanation of why this transaction was made.' })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ example: 'Delivered on time', description: 'Any additional comments or notes about the transaction.', required: false })
  @IsOptional()
  @IsString()
  extraNotes?: string;
}