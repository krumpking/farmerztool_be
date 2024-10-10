import { IsDate, IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class LocationDTO {
  @ApiProperty({
    description: 'The date of the location',
    type: Date,
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'The latitude of the location',
    type: Number,
    example: 37.7749,
    required: true,
  })
  @IsLatitude()
  lat: number;

  @ApiProperty({
    description: 'The longitude of the location',
    type: Number,
    example: -122.4194,
    required: true,
  })
  @IsLongitude()
  lng: number;
}