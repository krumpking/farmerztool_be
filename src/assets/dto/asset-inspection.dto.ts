import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInspectionDTO {

  @ApiProperty({
    description: 'The condition of the asset during the inspection',
    example: 'Good',
  })
  @IsString()
  condition: string;

  @ApiProperty({
    description: 'Any issues found during the inspection',
    example: 'Worn tire',
  })
  @IsOptional()
  @IsString()
  issuesFound: string;

  @ApiProperty({
    description: 'Recommended actions to address the issues found',
    example: 'Replace tire',
  })
  @IsOptional()
  @IsString()
  recommendedActions: string;

  @ApiProperty({
    description: 'The status of the inspection',
    example: 'pending',
    enum: ['pending', 'in_progress', 'completed'],
  })
  @IsEnum(['pending', 'in_progress', 'completed'])
  status: string;
}