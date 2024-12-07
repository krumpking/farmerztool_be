import { IsNotEmpty, IsOptional, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAnimalAssetDto {

    @ApiProperty({
        description: 'The date when the asset was assigned',
        example: '2023-10-01',
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    dateAssigned: Date;

    @ApiProperty({
        description: 'The date when the asset was last updated',
        example: '2023-10-02',
        required: false,
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateUpdated?: Date;

    @ApiProperty({
        description: 'The type of the asset',
        example: 'Medical Equipment',
    })
    @IsNotEmpty()
    @IsString()
    assetType: string;
}