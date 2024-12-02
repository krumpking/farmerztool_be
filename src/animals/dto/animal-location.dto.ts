import { IsDate, IsLatitude, IsLongitude, IsNumber, IsString } from 'class-validator';
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

  // New fields
  @ApiProperty({
    description: 'Current location name/number assigned',
    example: 'Barn A',
    required: true,
  })
  @IsString()
  currentLocationName: string;

  @ApiProperty({
    description: 'Total number of animals housed in the current location',
    example: 10,
    required: true,
  })
  @IsNumber()
  numberOfAnimalsHoused: number;

  @ApiProperty({
    description: 'Date of the last move',
    example: '2023-10-01',
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  lastMoveDate: Date;

  @ApiProperty({
    description: 'Time spent in the current location',
    example: '2 days',
    required: true,
  })
  @IsString()
  timeInCurrentLocation: string;
}