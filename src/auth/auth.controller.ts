import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
// import * as bcrypt from 'bcrypt';
import { Public } from './decorators/public.decator';
import { ResponseDto } from 'src/common/response.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update.dto';

@ApiTags('Auth Controllers')
@ApiBearerAuth()
@Controller('/api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)

  @ApiOperation({ 
    summary: "Register a new user" ,
    description: "Note that there are 4 fields all required except phone number since there is email, so user can register without phone number. The reason why l removed other fields is that they dont need to be filled by the user but the system will such as roles and permissions"
  })

  async addUser(@Body() userDto: UserDto): Promise<any> {
    const response = await this.authService.addUser(userDto);

    if (response.data) {
      const userEmail = response.data.email;
      await this.authService.sendOtp(userEmail);
    }
    return response;
  }

  @Public()
  @Post('login')

  @ApiOperation({ summary: "Login an existing user",
    description: "All fields required"
   })

  @ApiBody({
    schema: {
      properties: {
        email: {type: 'string', example: 'user@example.com'}, 
        password: {type: 'string', example: 'password'}
      }
    }
  })
  async login(@Body('email') email: string,
  @Body('password') password: string,){
    return this.authService.login(email, password);

  }

  @Public()
  @Post('send/otp')
  @ApiOperation({ summary: "Send a one-time password (OTP) to a user's email" })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
    },
  })
  async sendOtp(@Body('email') email: string): Promise<ResponseDto> {
    const res = await this.authService.sendOtp(email);
    if (res) {
      return { data: [], message: 'Otp sent successfully', success: true };
    } else {
      return {
        data: null,
        message: 'There was an error sending otp',
        success: false,
      };
    }
  }

  @Public()
  @Patch('update/password')
  @ApiOperation({
    summary:
      "Update a user's password using their email, OTP, and new password",
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        newPassword: { type: 'string', example: '1234567890' },
        otp: { type: 'string', example: '095645' },
      },
    },
  })
  async updatePassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
    @Body('otp') otp: string,
  ) {
    return this.authService.updatePassword(email, otp, newPassword);
  }

  @Public()
  @Patch('users/verification')
  @ApiOperation({ summary: 'Update user verified status to true' })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        otp: { type: 'string', example: '095645' },
      },
    },
  })
  async verifyUser(@Body('email') email: string, @Body('otp') otp: string) {
    return this.authService.verifyUser(email, otp);
  }

  
  @Patch('update/user/:id')

  @ApiOperation({ summary: "Update a user's profile information" })
  async updateUser(@Param('id') id: string ,@Body() updateDto: UpdateUserDto, @Request() req): Promise<ResponseDto> {
    const userId = req.user.id;
    if (userId === id) {
      return this.authService.updateUser(id, updateDto);
    } else {
      return ResponseDto.errorResponse("Cannot update user")
    }
  }

  // @Post('admin/add/user')
  // @HttpCode(HttpStatus.OK)
  // async adminAddUser(@Body('user') user: UserDto): Promise<ResponseDto> {
  //   // const saltOrRounds = 10;
  //   // const password = 'random_password';
  //   // const hash = await bcrypt.hash(user.password, saltOrRounds);

  //   // const newUser: UserDto = {
  //   //   email: user.email,
  //   //   password: hash,
  //   //   adminId: user.adminId,
  //   //   otp: '',
  //   // };

  //   const _user = await this.authService.addUser(newUser);

  //   if (_user == null) {
  //     return {
  //       data: null,
  //       message: 'Email already exists',
  //       success: false,
  //     };
  //   } else {
  //     return {
  //       data: _user,
  //       message: 'User was registered successfully',
  //       success: true,
  //     };
  //   }
  // }

  @Delete('delete/user')
  @HttpCode(HttpStatus.OK)

  @ApiOperation({ summary: "Delete a user account" })
  async adminDeleteUser(@Param('id') id: string, @Request() req):Promise<ResponseDto> {
    const userId = req.user.id;
    if(userId === id){
      return await this.authService.deleteUser(id);

    } else {
      return ResponseDto.errorResponse("Cannot delete user")
    }
  }
}
