import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OTP_MODEL, USER_MODEL } from './constants/auth.constants';
// import * as nodemailer from 'nodemailer';
import { Otp } from './interfaces/otp.interface';
import { generatorRandomString, readHTMLFile } from 'src/common/utils';
import { dirname } from 'path';
import handlebars from 'handlebars';
import { EMPLOYEE_MODEL } from 'src/admin/constants/admin.constants';
import { Employee } from 'src/admin/interfaces/employee.interface';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';
import { ResponseDto } from 'src/common/response.dto';
import { UpdateOtp } from './dto/update.dto';

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
  ) { }


  async addUser(userDto: UserDto): Promise<ResponseDto> {
    const response = new ResponseDto();
    const userExist = await this.userModel.findOne({ email: userDto.email });

    if (userExist) {
      response.success = false;
      response.message = "User already exist";
      response.data = null;
      return response;
    }

    //password must be 6 characters long

    if (userDto.password.split("").length < 6) {
      response.success = false;
      response.message = "Password must be 6 characters long";
      return response;
    }


    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);

    const newUser = new this.userModel({ ...userDto, password: hashedPassword });

    const savedUser = await newUser.save();

    response.success = true;
    response.message = "User created successfully";
    response.data = savedUser;

    return response;
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

  async sendOtp(email: string): Promise<ResponseDto> {
    const response = new ResponseDto();
    const appDir = dirname(require.main.path);

    readHTMLFile(
      `${appDir}/src/auth/html/otp.html`,
      async (err: any, html: any) => {
        if (err) {
          console.log('error reading file', err);
          return;
        }

        const randomString = generatorRandomString(6);

        //OTP should be one hour after that delete it from db

        const otpExpiryTime = new Date(Date.now() + 60 * 60 * 1000);

        // Create Otp model and save to database
        const otpModel = {
          email: email,
          otp: randomString,
          expiresAt: otpExpiryTime
        };

        const otpM = new this.otpModel(otpModel);
        await otpM.save();

        //save the otp to user model
        const userUpdateOnOTP = await this.userModel.findOneAndUpdate({ email: email },
          {
            $set: {
              otp: randomString,
              otpCreatedAt: new Date()
            }
          },
          { new: true });

        if (!userUpdateOnOTP) {
          response.success = false;
          response.message = "Invalid email";
          response.data = null;
          return response;
        }

        const template = handlebars.compile(html);
        const replacements = {
          otp: randomString,
          validity: "1 hour",
        };

        const htmlToSend = template(replacements);

        const connectionString =
          'endpoint=https://farmerztoolcommsservice.unitedstates.communication.azure.com/;accesskey=8keRIH8BsaK0RqbSEuNO9PWRFlcRljH987qWBpcpjQcMvW55NwvGJQQJ99AHACULyCpB7fcQAAAAAZCSuwZw';
        const client = new EmailClient(connectionString);

        const emailMessage = {
          senderAddress:
            'DoNotReply@ecbfcf1d-9676-45a9-9a59-84b5c339b606.azurecomm.net',
          content: {
            subject: 'One Time Password',
            html: htmlToSend,
          },
          recipients: {
            to: [{ address: email }],
          },
        };

        const poller = await client.beginSend(emailMessage);

        const status = poller.getResult();

        if (status != null && typeof status === 'string') {
          if (status === KnownEmailSendStatus.Succeeded) {
            return true;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    );

    response.success = true,
      response.message = "OTP sent successfully",
      response.data = null;
    return response;
  }

  async updatePassword(
    email: string,
    otp: string,
    newPassowrd: string,
  ): Promise<ResponseDto> {

    const response = new ResponseDto();

    const user = await this.userModel.findOne({ email });

    if (!user) {
      response.success = false;
      response.message = 'User not found';
      response.data = null;
      return response;
    }

    if (newPassowrd.split("").length < 6) {
      response.success = false;
      response.message = 'Password should be 6 characters long';
      return response;
    }

    if (user.otp !== otp) {
      response.success = false;
        response.message = "Invalid OTP";
        response.data = null;
      return response;
    }

    // now lets check if otp hasnt expired

    const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));
    if (user.otpCreatedAt < oneHourAgo) {
      response.success = false;
        response.message = "OTP has expired";
        response.data = null;
      return response;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassowrd, salt);

    const updatePassword = await this.userModel.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } }, { new: true });

    if (!updatePassword) {
      response.success = false;
      response.message = "Failed to update password";
      response.data = null;
      return response;
    }

    response.success = true;
    response.message = 'Password updated successfully';
    response.data = null;

    return response;
  };


  async updateUser(updateDto: UpdateOtp): Promise<ResponseDto> {
    const newUser = await this.userModel.findOneAndUpdate({ email: updateDto.email }, updateDto, { new: true });
    const response = new ResponseDto();
    if (!newUser) {
      response.success = false;
      response.message = 'User not found';
      response.data = null;
      return response;
    }
    response.success = true;
    response.message = 'User updated successfully';
    response.data = null;
    return response;
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
