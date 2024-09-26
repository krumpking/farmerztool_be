import { Inject, Injectable } from '@nestjs/common';
// import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateMobilePaymentDto } from './dto/mobile-payment.dto';
import { Model } from 'mongoose';
import { PAYMENT_MODEL, PAYMENT_ID, PAYNOW_KEY } from './constants/payment.contact';
import { Payment } from './interfaces/payment.interface';
import { Paynow } from "paynow";
import axios from "axios";
import { ResponseDto } from 'src/common/response.dto';
import { EMPLOYEE_MODEL } from 'src/admin/constants/admin.constants';
import { Employee } from 'src/admin/interfaces/employee.interface';
import { USER_MODEL } from 'src/auth/constants/auth.constants';
import { User } from 'src/auth/interfaces/user.interface';

interface PaynowResponse {
  success: boolean;
  instructions: string;
  pollUrl: string;
  error?: string;
}

const paynow = new Paynow(PAYMENT_ID, PAYNOW_KEY);


@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PAYMENT_MODEL)
    private paymentModel: Model<Payment>,
    @Inject(EMPLOYEE_MODEL) private employeeModel: Model<Employee>,
    @Inject(USER_MODEL) private userModel: Model<User>,
  ) { }

  // async addSub(payment: CreatePaymentDto): Promise<any> {
  //   try {
  //     const createdPayment = new this.paymentModel(payment);

  //     var newPayment = await createdPayment.save();

  //     return newPayment;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // async findAll(adminId: string): Promise<Payment[]> {
  //   try {
  //   return this.paymentModel
  //     .find({ adminId: adminId })
  //     .sort({ _id: -1 })
  //     .exec();
  //     } catch (error) {
  //     return null;
  //   }
  // }


  async initiateMobilePayment(payment: CreateMobilePaymentDto): Promise<ResponseDto> {


    try {
      paynow.returnUrl = "http://farmerztool.com/return?gateway=paynow&merchantReference=1234";
      paynow.resultUrl = "http://farmerztool.com/gateways/paynow/update";

      const pay = paynow.createPayment("Invoice 1", "kakunguwo.ron@gmail.com");

      pay.add("sub", payment.amount)


      paynow.sendMobile(pay, '0777000000', 'ecocash')
  .then((response: PaynowResponse) => {
    if (response && response.success) {
      const instructions = response.instructions;
      const pollUrl = response.pollUrl;
      console.log(instructions);
      console.log(pollUrl);
    } else {
      console.log(response.error);
    }
  })
  .catch((error: Error) => {
    console.error('Error sending mobile payment:', error);
  });

    } catch (error) {
      console.error(error);
      return null;
    }
  }


  async confirmPayment(payment: CreateMobilePaymentDto): Promise<any> {




    try {

      const results = await axios.get(payment.pollUrl);

      if (results != null) {
        if (results.data.includes("status=Paid")) {
          const newPayment = {
            adminId: payment.adminId,
            amount: payment.amount,

            description: payment.description
          };
          const createdPayment = new this.paymentModel(newPayment);

          const confirmedPayment = await createdPayment.save();

          console.log(confirmedPayment);
          

          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }




    } catch (error) {
      return false;
    }


  }
}
