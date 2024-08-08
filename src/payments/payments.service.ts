import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateMobilePaymentDto } from './dto/mobile-payment.dto';
import { Model } from 'mongoose';
import { PAYMENT_MODEL,PAYMENT_ID ,PAYNOW_KEY } from './constants/payment.contact';
import { Payment } from './interfaces/payment.interface';
import { Paynow } from "paynow";
import axios from "axios";

const paynow = new Paynow(PAYMENT_ID, PAYNOW_KEY);


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
    try {
    return this.paymentModel
      .find({ adminId: adminId })
      .sort({ _id: -1 })
      .exec();
      } catch (error) {
      return null;
    }
  }


  async initiateMobilePayment(payment :CreateMobilePaymentDto): Promise<any> {


    try {
      paynow.returnUrl = "http://example.com/return?gateway=paynow&merchantReference=1234";
     paynow.resultUrl = "http://example.com/gateways/paynow/update"; 
    

      let pay = paynow.createPayment("Invoice 1", "tafaraushe97@gmail.com");

      
pay.add("subscription", payment.amount);



            var res = await paynow.sendMobile(
    
    // The payment to send to Paynow
    pay, 

    // The phone number making payment
    payment.phoneNumber,
    
    // The mobile money method to use. 
    'ecocash' 

);
           

      if(res.success){
      
        return res.pollUrl;
      } else {
        return null;
      }

    }catch (error) {
      console.error(error);
      return null;
    }
  }


  async confirmPayment (payment :CreateMobilePaymentDto): Promise<any> {




 try {
  
  var results = await axios.get(payment.pollUrl);
 
  if(results != null){
if(results.data.includes("status=Paid")){
      var newPayment = {
      adminId: payment.adminId,
  amount: payment.amount,
  
  description: payment.description
    };
      const createdPayment = new this.paymentModel(newPayment);

      var confirmedPayment = await createdPayment.save();

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
