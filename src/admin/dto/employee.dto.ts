import { IsEmail, IsString, IsArray, IsIn} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Roles {
  Admin = 'Admin',
  Finance = 'Finance',
  AnimalManager = 'Animal Manager',
  CropManagement = 'Crop Management',
  FarmManager = 'Farm Manager',
  AssetManager = 'Asset Manager',
  EggsHatcheryManager = 'Eggs Hatchery Manager',
  CommunicationManager = 'Communication Manager',
  FarmWorker = 'Farm Worker',
  Veterinarian = 'Veterinarian',
}

export class EmployeeDto {

  @IsEmail()
  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Password',
    example: 'mysecretpassword',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Employee full name',
    example: 'Ronnie Kakunguwo',
  })
  fullName?: string;

  @IsString()
  @ApiProperty({
    description: 'Phone number',
    example: '+2637877768777',
  })
  phoneNumber: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Permissions',
    example: ['read', 'create', 'delete', 'update'],
  })
  perms: string[];


  @IsString()
  @IsIn(Object.values(Roles))
  @ApiProperty({
    description: `Role of the employee. One of: ${Object.values(Roles).join(', ')}`,
    example: 'Admin',
  })
  role: Roles;
}

