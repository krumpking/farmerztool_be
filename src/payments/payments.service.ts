import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Model } from 'mongoose';
import { PAYMENT_MODEL } from './constants/payment.contact';
import { Payment } from './interfaces/payment.interface';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PAYMENT_MODEL)
    private paymentModel: Model<Payment>,
  ) {}

  async addSub(payment: CreatePaymentDto): Promise<any> {
    try {
      const createdPayment = new this.paymentModel(payment);

      var newPayment = await createdPayment.save();

      return newPayment;
    } catch (error) {
      return null;
    }
  }

  async findAll(adminId: string): Promise<Payment[]> {
    return this.paymentModel
      .find({ adminId: adminId })
      .sort({ _id: -1 })
      .exec();
  }
}
