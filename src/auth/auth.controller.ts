import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decator';
import { ResponseDto } from 'src/common/response.dto';

@Controller('/api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async addUser(@Body('user') user: UserDto): Promise<ResponseDto> {
    const saltOrRounds = 10;
    const password = 'random_password';
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    let newUser: UserDto = { email: user.email, password: hash, adminId: '' };

    const _user = await this.authService.addUser(newUser);

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

  @Public()
  @Post('login')
  async login(@Body('user') user: UserDto): Promise<ResponseDto> {
    const _user = await this.authService.login(user);
    if (_user !== null) {
      return { data: _user, message: 'Login successful', success: true };
    } else {
      return { data: null, message: 'Login unsuccessful', success: false };
    }
  }

  @Public()
  @Post('send/otp')
  async sendOtp(@Body('email') email: string): Promise<ResponseDto> {
    const _user = await this.authService.sendOtp(email);
    if (_user !== null) {
      return { data: _user, message: 'Login successful', success: true };
    } else {
      return { data: null, message: 'Login unsuccessful', success: false };
    }
  }

  @Patch('update/user')
  async sendUser(@Body('user') user: UserDto): Promise<ResponseDto> {
    const _user = await this.authService.updatePassword(
      user.email,
      user.password,
    );
    if (_user !== null) {
      return { data: _user, message: 'Update successful', success: true };
    } else {
      return { data: null, message: 'Update unsuccessful', success: false };
    }
  }

  @Post('adminAddUser')
  @HttpCode(HttpStatus.OK)
  async adminAddUser(@Body('user') user: UserDto): Promise<ResponseDto> {
    const saltOrRounds = 10;
    const password = 'random_password';
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    let newUser: UserDto = {
      email: user.email,
      password: hash,
      adminId: user.adminId,
    };

    const _user = await this.authService.addUser(newUser);

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

  @Delete('adminDeleteUser')
  @HttpCode(HttpStatus.OK)
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
