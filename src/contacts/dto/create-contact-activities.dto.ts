import { IsString, IsDate} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateContactActivityDTO {
  @ApiProperty({
    description: 'The title of the activity',
    example: 'Meeting with John Doe',
  })
  @IsString()
  activityTitle: string;

  @ApiProperty({
    description: 'The type of activity',
    example: "Meeting"
  })
  @IsString()
  activityType: string;

  @ApiProperty({
    description: 'The details of the activity',
    example: 'Discussed project details',
  })
  @IsString()
  activityDetails: string;

  @ApiPropertyOptional({
    description: 'Any additional notes about the activity',
    example: 'Follow up next week',
  })
  @IsString()
  activityNotes?: string;

  @ApiProperty({
    description: 'The date of the activity using this format %Y-%m-%d eg 2024-10-30',
    example: '2024-10-30',
  })
  @IsDate()
  @Type(() => Date)
  activityDate: Date;
}
