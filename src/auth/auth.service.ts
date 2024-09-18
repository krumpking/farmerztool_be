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
import {
  EMPLOYEE_MODEL,
  FARM_MODEL,
} from 'src/admin/constants/admin.constants';
import { Employee } from 'src/admin/interfaces/employee.interface';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';
import { ResponseDto } from 'src/common/response.dto';
import { Farm } from 'src/admin/interfaces/farm.interface';
import { UpdateUserDto } from './dto/update.dto';


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
    @Inject(FARM_MODEL)
    private farmModel: Model<Farm>,
  ) {}

  async addUser(userDto: UserDto): Promise<ResponseDto> {
    const permissions = ["create", "read", "update", "delete"];
    const userExist = await this.userModel.findOne({ email: userDto.email });

    if (userExist) {
      return ResponseDto.errorResponse('User already exist');
    }

    //password must be 6 characters long

    if (userDto.password.split('').length < 6) {
      return ResponseDto.errorResponse('Password must be 6 characters long');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    

    const newUser = await this.userModel.create({
      ...userDto,
      role: "Admin",
      permissions: permissions,
      password: hashedPassword
    })

    const createdUser = await this.userModel.findById(newUser._id).select("-password");

    if (!createdUser) {
      return ResponseDto.errorResponse('Failed to create user');
    }


    await this.userModel.findByIdAndUpdate(createdUser._id, {adminId: createdUser._id}, {new: true}).exec();

    return ResponseDto.successResponse("User created successfully", createdUser);

  }

  async generateAccessTokenForVerifiedUser(
    email: string,
  ): Promise<ResponseDto> {
    try {
      const emailExists = await this.userModel.findOne({ email });
      if (!emailExists) {
        const employeeExists = await this.employeeModel.findOne({ email });

        if (!employeeExists) {
          return ResponseDto.errorResponse('User not found');
        }

        if (true) {
          const payload = {
            id: employeeExists._id,
            email: employeeExists.email,
            adminId: employeeExists.adminId,
            permissions: employeeExists.perms,
            roles: employeeExists.role
          };

          const userData = {
            access_token: await this.jwtService.signAsync(payload),
            adminId: employeeExists._id,
            email: employeeExists.email,
            roles: employeeExists.role,
            permissions: employeeExists.perms,
          };
          return ResponseDto.successResponse('Login successful', userData);
        }
      } else {
        if (true) {
          const payload = {
            id: emailExists._id,
            email: emailExists.email,
            roles: emailExists.role,
            adminId: emailExists._id,
            permissions: emailExists.permissions,
          };

          const userData = {
            access_token: await this.jwtService.signAsync(payload),
            adminId: emailExists._id,
            email: emailExists.email,
            perms: emailExists.permissions,
            roles: emailExists.role
          };
          return ResponseDto.successResponse('Login successful', userData);
        }
      }
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, please try again',
      );
    }
  }

  async verifyUser(email: string, otp: string): Promise<ResponseDto> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return ResponseDto.errorResponse('User not found');
      }

      if (user.otp !== otp) {
        return ResponseDto.errorResponse('Invalid OTP');
      }

      // OTP HAS ONE HOUR LIFE

      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      if (user.otpCreatedAt < oneHourAgo) {
        return ResponseDto.errorResponse('OTP has expired');
      }

      const updateVerification = await this.userModel.findOneAndUpdate(
        { email },
        { $set: { verified: true } },
        { new: true },
      );

      if (!updateVerification) {
        return ResponseDto.errorResponse('Email verification failed');
      }

      const login = await this.generateAccessTokenForVerifiedUser(
        updateVerification?.email,
      );

      return ResponseDto.successResponse('verification successful', login);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse(
        'Something went wrong, while verifying user',
      );
    }
  }



  async login(email: string, password: string): Promise<ResponseDto> {

    const emailExists = await this.userModel.findOne({ email});
    if (!emailExists) {
      const employeeExists = await this.employeeModel.findOne({ email});


      if (!employeeExists) {
        return ResponseDto.errorResponse('User not found');
      }

      if (!employeeExists.password) {
        return ResponseDto.errorResponse('Password not found');
      }

   const match = await bcrypt.compare(password, employeeExists.password);


      if (match) {
        const payload = {
          id: employeeExists._id,
          email: employeeExists.email,
          password: employeeExists.password,
          adminId: employeeExists.adminId,
          permissions: employeeExists.perms,
          roles: employeeExists.role
        };

        const userData = {
          access_token: await this.jwtService.signAsync(payload),
          adminId: employeeExists._id,
          email: employeeExists.email,
          perms: employeeExists.perms,
          roles: employeeExists.role
        };

        return ResponseDto.successResponse('Login successful', userData);
      } else {
        return ResponseDto.errorResponse('Invalid password');
      }
    } else {
      if (!emailExists.password) {
        return ResponseDto.errorResponse('Password not found');
      }

      const match = await bcrypt.compare(password, emailExists.password);

      if (match) {
        const payload = {
          id: emailExists._id,
          email: emailExists.email,
          roles: emailExists.role,
          adminId: emailExists._id,
          permissions: emailExists.permissions,
          
        };

        const userData = {
          access_token: await this.jwtService.signAsync(payload),
          adminId: emailExists._id,
          email: emailExists.email,
          perms: emailExists.permissions,
          roles: emailExists.role
        };

        return ResponseDto.successResponse('Login successful', userData);
      } else {
        return ResponseDto.errorResponse('Invalid password');
      }
    }
  }

  async sendOtp(email: string): Promise<ResponseDto> {
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
          expiresAt: otpExpiryTime,
        };

        const otpM = new this.otpModel(otpModel);
        await otpM.save();

        //save the otp to user model
        const userUpdateOnOTP = await this.userModel.findOneAndUpdate(
          { email: email },
          {
            $set: {
              otp: randomString,
              otpCreatedAt: new Date(),
            },
          },
          { new: true },
        );

        if (!userUpdateOnOTP) {
          
          return ResponseDto.errorResponse("Invalid email");
        }

        const template = handlebars.compile(html);
        const replacements = {
          otp: randomString,
          validity: '1 hour',
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


    return ResponseDto.successResponse("OTP sent successfully", null);
  }

  async updatePassword(
    email: string,
    otp: string,
    newPassowrd: string,
  ): Promise<ResponseDto> {

    const user = await this.userModel.findOne({ email });

    if (!user) {
      return ResponseDto.errorResponse('User not found');
    }


    if (newPassowrd.split("").length < 6) {
      return ResponseDto.errorResponse('Password should be 6 characters long');
    }

    if (user.otp !== otp) {
      return ResponseDto.errorResponse("Invalid OTP");
    }

    // now lets check if otp hasnt expired

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (user.otpCreatedAt < oneHourAgo) {

      return ResponseDto.errorResponse("OTP has expired");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassowrd, salt);

    const updatePassword = await this.userModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } },
      { new: true },
    );

    if (!updatePassword) {

      return ResponseDto.errorResponse("Failed to update password");
    }

    return ResponseDto.successResponse('Password updated successfully', null);
  };


  async updateUser(id: string, updateDto: UpdateUserDto): Promise<ResponseDto> {
    const updatedDto = {...updateDto};
    delete updatedDto.password;
    const newUser = await this.userModel.findByIdAndUpdate(id, updatedDto, { new: true }).select("-password");
  
    if (!newUser) {
      return ResponseDto.errorResponse('User not found');
    }

    return ResponseDto.successResponse('User updated successfully', newUser);
  }

  async deleteUser(id: string): Promise<ResponseDto> {
    try {
      const user = await this.userModel.findByIdAndDelete(id)

      if (!user) {
        return ResponseDto.errorResponse("Failed to delete account");
      }

      return ResponseDto.successResponse("Account deleted successfully", null)
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, deleting account")
      
    }
  }
}
