import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('/api/v1')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/add/subscription')
  async create(@Body('payment') createPaymentDto: CreatePaymentDto) {
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

  @Get('/check/subscription')
  async checkSub(@Param('admin') admin: string) {
    const _addSub = await this.paymentsService.findAll(admin);
    // Check the date of the last subscription and compare it with the current date
    // If the subscription has expired, return a message to the user to renew subscription
    // If the subscription has not expired, return a message to the user that the subscription is still valid

    if (_addSub == null) {
      return {
        data: null,
        message: 'There was an error retrieving subscription data',
        success: false,
      };
    }

    const lastPaymentDate = new Date(_addSub[0].date); // Assuming _addSub has a lastPaymentDate field
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
