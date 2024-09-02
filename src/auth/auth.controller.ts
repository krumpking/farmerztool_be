import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
// import * as bcrypt from 'bcrypt';
import { Public } from './decorators/public.decator';
import { ResponseDto } from 'src/common/response.dto';
import { UpdateOtp } from './dto/update.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags("Auth Controllers")
@ApiBearerAuth()
@Controller('/api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Register a new user" })
  async addUser(@Body() userDto: UserDto): Promise<ResponseDto> {
    return this.authService.addUser(userDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: "Login an existing user" })
  async login(@Body() userDto: UserDto): Promise<any> {
    return this.authService.login(userDto);
  }

  @Public()
  @Post('send/otp')
  @ApiOperation({ summary: "Send a one-time password (OTP) to a user's email" })
  @ApiBody({
    schema: {
      properties: {
        email: {type: 'string', example: 'user@example.com'}, 
      }
    }
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
  @ApiOperation({ summary: "Update a user's password using their email, OTP, and new password" })
  @ApiBody({
    schema: {
      properties: {
        email: {type: 'string',example: 'user@example.com'},
        newPassword: {type: 'string', example: '1234567890'},
        otp: {type: 'string', example: '095645'}
      }
    }
  })
  async updatePassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
    @Body('otp') otp: string
  ): Promise<ResponseDto> {
    return this.authService.updatePassword(email, otp, newPassword);
  }

  
  @Patch('update/user')
  @ApiOperation({ summary: "Update a user's profile information" })
  async updateUser(@Body() updateDto: UpdateOtp): Promise<ResponseDto> {
    return this.authService.updateUser(updateDto);
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

  @Delete('adminDeleteUser')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a user by admin" })
  async adminDeleteUser(@Body('user') user: UserDto): Promise<ResponseDto> {
    const _user = await this.authService.deleteUser(user);

    if (_user == null) {
      return {
        data: null,
        message: 'Email already exists',
        success: false,
      };
    } else {
      return {
        data: _user,
        message: 'User was registered successfully',
        success: true,
      };
    }
  }
}
