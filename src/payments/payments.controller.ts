import {
  Controller,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
// import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateMobilePaymentDto } from './dto/mobile-payment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags("Payment routes")
@Controller('/api/v1')
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}


  @Post('/initiate/mobile')
  async create(@Body() payment: CreateMobilePaymentDto) {
    return this.paymentsService.initiateMobilePayment(payment);
  }


  @Post('/confirm/mobile')
  async confirmPayment(@Body() payment: CreateMobilePaymentDto) {

    const _addSub = await this.paymentsService.confirmPayment(payment);
    console.log(_addSub);

    if (_addSub) {
      return {
        data: null,
        message: 'Payment confirmed successfully ',
        success: true,
      };
    } else {
      return {
        data: _addSub,
        message: 'There was an error confirming payment',
        success: false,
      };
    }
  }



  @Post('/add/subscription')
  async createSub(@Body() createPaymentDto: CreatePaymentDto) {
    const _addSub = await this.paymentsService.addSub(createPaymentDto);

    if (_addSub == null) {
      return {
        data: null,
        message: 'There was an error adding sub',
        success: false,
      };
    } else {
      return {
        data: _addSub,
        message: 'Sub added successfully',
        success: true,
      };
    }
  }

  @Get('/check/subscription/:admin')
  async checkSub(@Param('admin') admin: string) {
    const _addSub = await this.paymentsService.findAll(admin);
    // Check the date of the last subscription and compare it with the current date
    // If the subscription has expired, return a message to the user to renew subscription
    // If the subscription has not expired, return a message to the user that the subscription is still valid

    if (_addSub == null) {
      return {
        data: null,
        message: 'Not yet to subscription',
        success: false,
      };
    }

    const lastPaymentDate = new Date(_addSub[0].createdAt); // Assuming _addSub has a lastPaymentDate field
 
    const currentDate = new Date();
    const diffTime = Math.abs(
      currentDate.getTime() - lastPaymentDate.getTime(),
    );

  
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return {
        data: _addSub,
        message: 'Subscription is still valid',
        success: true,
      };
    } else {
      return {
        data: _addSub,
        message: 'Subscription has expired, please renew',
        success: false,
      };
    }
  }

  @Get('/subs/:adminId')
  async getSub(@Param('adminId') adminId: string) {
    const _getSubs = await this.paymentsService.findAll(adminId);

    if (_getSubs == null) {
      return {
        data: null,
        message: 'There was an error adding sub',
        success: false,
      };
    } else {
      return {
        data: _getSubs,
        message: 'Subs sent successfully',
        success: true,
      };
    }
  }
}
