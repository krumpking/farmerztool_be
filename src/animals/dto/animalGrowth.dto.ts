import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AnimalGrowthDTO {
    @ApiProperty({
        description: 'ID of the animal',
        type: String,
        example: 'animal123',
        required: true,
    })
    @IsString()
    animalId: string; // ID of the animal

    @ApiProperty({
        description: 'ID of the user who added the growth record',
        type: String,
        example: 'user456',
        required: true,
    })
    @IsString()
    addedBy: string; // ID of the user who added the growth record

    @ApiProperty({
        description: 'Current weight of the animal in kgs',
        type: Number,
        example: 150,
        required: true,
    })
    @IsNumber()
    weight: number; // Current weight in kgs

    @ApiProperty({
        description: 'Last weigh-in date',
        type: String,
        example: '2023-10-01',
        required: true,
    })
    @IsDateString()
    @Type(() => Date)
    lastWeightDate: string; // Last weigh-in date (string)

    @ApiProperty({
        description: 'Current height of the animal in metres',
        type: Number,
        example: 1.5,
        required: true,
    })
    @IsNumber()
    height: number; // Current height in metres

    @ApiProperty({
        description: 'Last height measurement date',
        type: String,
        example: '2023-10-01',
        required: true,
    })
    @IsDateString()
    @Type(() => Date)
    lastHeightDate: string; // Last height measurement date (string)

    @ApiProperty({
        description: 'Current length of the animal in metres',
        type: Number,
        example: 1.2,
        required: true,
    })
    @IsNumber()
    length: number; // Current length in metres

    @ApiProperty({
        description: 'Last length measurement date',
        type: String,
        example: '2023-10-01',
        required: true,
    })
    @IsDateString()
    @Type(() => Date)
    lastLengthDate: string; // Last length measurement date (string)
}