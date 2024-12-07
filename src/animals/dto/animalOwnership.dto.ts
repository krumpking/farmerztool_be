import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class TransferSaleHistory {
    @ApiProperty({
        description: 'The name of the previous owner.',
        example: 'Jane Smith',
    })
    @IsString()
    @IsNotEmpty()
    previousOwner: string;

    @ApiProperty({
        description: 'The date of ownership transfer.',
        example: '2023-01-15',
    })
    @IsDate()
    @Type(() => Date)
    date: Date; // Consider using a date type if you want to enforce date format
}

export class AnimalOwnershipDTO {

    @ApiProperty({
        description: 'Name of the current owner of the animal.',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    currentOwner: string; // Name of the current owner

    @ApiProperty({
        description: 'Array of previous owners and the dates of ownership transfer.',
        type: [TransferSaleHistory],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TransferSaleHistory)
    transferSaleHistory: TransferSaleHistory[]; // Array of previous owners and dates

    @ApiProperty({
        description: 'Date when the animal was acquired.',
        example: '2023-01-10',
    })
    @IsString()
    @IsNotEmpty()
    dateOfAcquisition: string; // Date when the animal was acquired

    @ApiProperty({
        description: 'URL of the document related to the transfer of ownership.',
        example: 'https://example.com/documents/ownership-transfer.pdf',
    })
    @IsString()
    @IsNotEmpty()
    transferOwnershipDocumentation: string; // URL of the ownership documentation

    @ApiProperty({
        description: 'Source from which the animal was acquired.',
        example: 'Local Animal Shelter',
    })
    @IsString()
    @IsNotEmpty()
    sourceOfAcquisition: string; // Source from where the animal was acquired

    @ApiProperty({
        description: 'Purchase price of the animal in dollars.',
        example: 1500,
    })
    @IsNumber()
    @IsNotEmpty()
    purchasePrice: number; // Purchase price in dollars

    @ApiProperty({
        description: 'Current market value of the animal in dollars.',
        example: 2000,
    })
    @IsNumber()
    @IsNotEmpty()
    currentMarketValue: number; // Current market value in dollars

    @ApiProperty({
        description: 'Insurance details if applicable.',
        example: 'Policy Number: 123456',
        required: false,
    })
    @IsOptional()
    @IsString()
    insurance?: string; // Insurance details if applicable
}