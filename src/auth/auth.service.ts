import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { USER_MODEL } from './constants/auth.constants';
import * as nodemailer from 'nodemailer';
import { generatorRandomString } from 'src/common/utils';
import { Otp } from './dto/otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,
    private otpModel: Model<Otp>,
    private jwtService: JwtService,
  ) {}

  async addUser(user: UserDto): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const emailExists = await this.userModel.find({ email: user.email });

      // If email exists, return email already exists message and success false, else create user
      if (emailExists.length > 0) {
        return null;
      }
      const createdUser = new this.userModel(user);

      var newUser = await createdUser.save();
      const payload = {
        adminId: newUser._id,
        email: newUser.email,
        password: newUser.password,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
        email: newUser.email,
        password: newUser.password,
        adminId: newUser._id,
      };
    } catch (error) {
      return null;
    }
  }

  async login(user: UserDto): Promise<any> {
    // Check if email already exists before logging in and then use bycrypt to compare password if both pass login successfully if not return exact message
    // Check if email is already taken before adding user
    const emailExists = await this.userModel.findOne({ email: user.email });

    if (emailExists == null) {
      return null;
    }

    const match = await bcrypt.compare(user.password, emailExists.password);

    const payload = {
      id: emailExists._id,
      email: emailExists.email,
      password: emailExists.password,
    };

    if (match) {
      return {
        access_token: await this.jwtService.signAsync(payload),
        adminId: emailExists._id,
        email: emailExists.email,
        password: emailExists.password,
      };
    } else {
      return null;
    }
  }

  async sendOtp(email: string): Promise<any> {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'adaismartfarming@gmail.com',
        pass: 'siwa htqb mpnz mewp',
      },
    });

    let randomString = await generatorRandomString(6);

    let mailDetails = {
      from: 'adaismartfarming@gmail.com',
      to: email,
      subject: 'One Time Password',
      text: 'Your One Time Password is: ' + randomString,
    };
    // Create Otp model and save to database
    let otpModel = {
      email: email,
      otp: randomString,
    };

    const otpM = new this.otpModel(otpModel);
    await otpM.save();

    let res = mailTransporter.sendMail(mailDetails);

    if (res !== null) {
      return {
        otp: randomString,
      };
    } else {
      return null;
    }
  }

  async updatePassword(email: string, newPassowrd: string): Promise<any> {
    let newUser = await this.userModel.findOneAndUpdate(
      {
        email: email,
      },
      { password: newPassowrd },
      { new: true },
    );

    if (newUser !== null) {
      return {
        updateSuccess: true,
      };
    } else {
      return null;
    }
  }

  async deleteUser(user: UserDto): Promise<any> {
    try {
      // Check if email is already taken before adding user
      const res = await this.userModel.findOneAndDelete({
        email: user.email,
      });

      // If email exists, return email already exists message and success false, else create user
      if (res == null) {
        return null;
      }

      return {
        deleted: true,
      };
    } catch (error) {
      return null;
    }
  }
}
