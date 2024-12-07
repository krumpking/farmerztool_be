import { IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AnimalGrowthDTO {

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
    @IsDate()
    @Type(() => Date)
    lastWeightDate: Date;

    @ApiProperty({
        description: 'Current height of the animal in metres',
        type: Number,
        example: 1.5,
        required: true,
    })
    @IsNumber()
    height: number;

    @ApiProperty({
        description: 'Last height measurement date',
        type: String,
        example: '2023-10-01',
        required: true,
    })
    @IsDate()
    @Type(() => Date)
    lastHeightDate: Date;

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
    @IsDate()
    @Type(() => Date)
    lastLengthDate: Date;
}