import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OTP_MODEL, USER_MODEL } from './constants/auth.constants';
import * as nodemailer from 'nodemailer';
import { Otp } from './interfaces/otp.interface';
import { generatorRandomString, readHTMLFile } from 'src/common/utils';
import { dirname } from 'path';
import handlebars from 'handlebars';
import { EMPLOYEE_MODEL } from 'src/admin/constants/admin.constants';
import { Employee } from 'src/admin/interfaces/employee.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,
    @Inject(OTP_MODEL)
    private otpModel: Model<Otp>,
    private jwtService: JwtService,
    @Inject(EMPLOYEE_MODEL)
    private employeeModel: Model<Employee>,
  ) {}

  async addUser(user: UserDto): Promise<any> {
    const otpExists = await this.otpModel.findOne({ otp: user.otp });

    if (otpExists == null) {
      return null;
    }

    if (otpExists.otp == user.otp) {
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
    } else {
      return null;
    }
  }

  async login(user: UserDto): Promise<any> {
    // Check if email already exists before logging in and then use bycrypt to compare password if both pass login successfully if not return exact message
    // Check if email is already taken before adding user
    const emailExists = await this.userModel.findOne({ email: user.email });

    if (emailExists == null) {
      const employeeExists = await this.employeeModel.findOne({
        email: user.email,
      });

      const match = await bcrypt.compare(
        user.password,
        employeeExists.password,
      );

      const payload = {
        id: employeeExists._id,
        email: employeeExists.email,
        password: employeeExists.password,
      };

      if (match) {
        console.log(employeeExists);
        return {
          access_token: await this.jwtService.signAsync(payload),
          adminId: employeeExists._id,
          email: employeeExists.email,
          password: employeeExists.password,
          perms: employeeExists.perms,
        };
      } else {
        console.log(null);
        return null;
      }
    } else {
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
          perms: [],
        };
      } else {
        return null;
      }
    }
  }

  async sendOtp(email: string): Promise<any> {
    const emailExists = await this.userModel.findOne({ email: email });
    console.log(emailExists);
    if (emailExists != null) {
      return null;
    }

    const appDir = dirname(require.main.path);

    readHTMLFile(
      `${appDir}/src/auth/html/otp.html`,
      async (err: any, html: any) => {
        if (err) {
          console.log('error reading file', err);
          return;
        }

        let randomString = generatorRandomString(6);

        // Create Otp model and save to database
        let otpModel = {
          email: email,
          otp: randomString,
        };

        const otpM = new this.otpModel(otpModel);
        await otpM.save();

        const template = handlebars.compile(html);
        const replacements = {
          otp: randomString,
        };

        const htmlToSend = template(replacements);

        // const transporter = nodemailer.createTransport({
        //   host: 'smtp-mail.outlook.com',
        //   secure: false,
        //   port: 587,
        //   auth: {
        //     user: 'support@famerztool.com',
        //     pass: 'BusinessSupp101$',
        //   },
        //   tls: {
        //     ciphers: 'SSLv3',
        //   },
        // });
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'adaismartfarming@gmail.com',
            pass: 'iftk uobi ttsy feos',
          },
        });

        const mailOptions = {
          from: 'support@farmerztool.com',
          to: email,
          subject: `One Time Password`,
          html: htmlToSend,
        };

        transporter.sendMail(
          mailOptions,
          (error: any, info: { response: any }) => {
            if (error) {
              console.error(error);
            } else {
              console.log(info.response);
            }
          },
        );
      },
    );
  }

  async updatePassword(
    email: string,
    newPassowrd: string,
    otp: string,
  ): Promise<any> {
    const otpExists = await this.otpModel.findOne({ otp: otp });

    if (otpExists == null) {
      return null;
    }

    if (otpExists.otp == otp) {
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
    } else {
      return null;
    }
  }

  async updateUser(user: UserDto): Promise<any> {
    let newUser = await this.userModel.findOneAndUpdate(
      {
        email: user.email,
      },
      { password: user.password },
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
