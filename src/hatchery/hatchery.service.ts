import { Inject, Injectable } from '@nestjs/common';
import { EggRecord } from './interfaces/hatchery.interface';
import { HATCHERY_MODEL, REMINDER_MODEL } from './constants/hatchery.constants';
import { Model } from 'mongoose';
import { CreateHatcheryDto } from './dto/create-hatchery.dto';
import { ResponseDto } from 'src/common/response.dto';
import { UpdateHatcheryDto } from './dto/update-hatchery.dto';
import { FARM_MODEL } from 'src/admin/constants/admin.constants';
import { Farm } from 'src/admin/interfaces/farm.interface';
import { Reminder } from './interfaces/reminder.interface';
import { CreateReminderDTO } from './dto/create-reminder.dto';
import axios from 'axios';
import { UpdateReminderDTO } from './dto/update-reminder.dto';


@Injectable()
export class HatcheryService {
  constructor(
    @Inject(HATCHERY_MODEL)
    private eggModel: Model<EggRecord>,
    @Inject(FARM_MODEL)
    private farmModel: Model<Farm>,
    @Inject(REMINDER_MODEL)
    private reminderModel: Model<Reminder>,

  ) { }


  /////////////////////////////////EGGS///////////////////////////////////////////////

  async createEgg(adminId: string, createEggDto: CreateHatcheryDto): Promise<ResponseDto> {
    try {
      //check if egg record exist by checking adminId, animalType, maleBreed, femaleBreed, EggColle, EggQua, EggCol, totalWei, purpo, batchNu
      const eggRecord = await this.eggModel.findOne({
        adminId,
        ...createEggDto
      }).exec();
      if (eggRecord) {
        return ResponseDto.errorResponse("Egg record already exists");
      }

      const eggInstance = await this.eggModel.create({
        ...createEggDto,
        adminId
      })

      const createdEggRecord = await this.eggModel.findById(eggInstance._id);

      if (!createdEggRecord) {
        return ResponseDto.errorResponse("Failed to create egg record");
      }

      //check if the user has a farm

      const farm = await this.farmModel.findOne({ adminId });

      if (farm) {
        const addEggRecordToFarm = await this.farmModel.findOneAndUpdate({ adminId }, {
          $push: { hatchery: createdEggRecord._id }
        });

        if (!addEggRecordToFarm) {
          return ResponseDto.errorResponse("Failed to add egg record to farm")
        }

        return ResponseDto.successResponse("Egg record created and added to farm", createdEggRecord);

      } else {
        return ResponseDto.successResponse("Egg record created", createdEggRecord);
      }

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while creating egg record")
    }
  }

  async getEggs(adminId: string): Promise<ResponseDto> {
    try {
      const eggs = await this.eggModel.find({ adminId }).exec();
      if (!eggs || eggs.length === 0) {
        return ResponseDto.errorResponse("No eggs available")
      }

      return ResponseDto.successResponse("Eggs fetched", eggs);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while getting eggs")
    }
  }

  async getEggById(id: string): Promise<ResponseDto> {
    try {
      const egg = await this.eggModel.findById(id).exec();
      if (!egg) {
        return ResponseDto.errorResponse("Egg not found")
      }

      return ResponseDto.successResponse("Egg found", egg);
    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while getting egg")
    }
  }

  async updateEgg(id: string, updateEggDto: UpdateHatcheryDto): Promise<ResponseDto> {
    try {

      const updatedEgg = await this.eggModel.findByIdAndUpdate(id, updateEggDto, { new: true }).exec();

      if (!updatedEgg) {
        return ResponseDto.errorResponse("Egg not found")
      }

      return ResponseDto.successResponse("Egg updated", updatedEgg);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while updating egg")
    }

  }

  async deleteEgg(id: string): Promise<ResponseDto> {
    try {

      const deletedEgg = await this.eggModel.findByIdAndDelete(id).exec();

      if (!deletedEgg) {
        return ResponseDto.errorResponse("Egg not found")
      }

      return ResponseDto.successResponse("Egg deleted", null);

    }

    catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while deleting egg")
    }

  }

  /////////////////////REMINDER///////////////////////////

  async createReminder(adminId: string, createReminderDTO: CreateReminderDTO): Promise<ResponseDto> {
    try {

      const now = new Date();
      if (createReminderDTO.reminderDate <= now) {
        return ResponseDto.errorResponse('Reminder date must be in the future')
      }
      
      const existingReminder = await this.reminderModel.findOne({
        adminId,
        ...createReminderDTO,
      });

      if (existingReminder) {
        return ResponseDto.errorResponse("Reminder already exists");
      }

      
      const reminder = await this.reminderModel.create({
        ...createReminderDTO,
        adminId,
      });

      const createdReminder = await this.reminderModel.findById(reminder._id);

      if (!createdReminder) {
        return ResponseDto.errorResponse("Failed to create reminder");
      }

      // await this.sendAzurePushNotification(createReminderDTO)

      return ResponseDto.successResponse("Reminder created", createdReminder);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while creating reminder");
    }
  }

  private async sendAzurePushNotification(reminderData: CreateReminderDTO): Promise<ResponseDto> { 
    const notificationPayload = {
      data: {
        message: `Reminder: ${reminderData.reminderTitle} is scheduled for ${reminderData.reminderDate.toISOString()} at ${reminderData.reminderTime}`,
      },
    };

    try {
      const token = "SharedAccessSignature sr=Farmerztool.servicebus.windows.net/&sig=yourSignature&se=1695587465&skn=DefaultFullSharedAccessSignature";
      const response = await axios.post(
        'https://Farmerztool.servicebus.windows.net/Farmerztool/messages/?api-version=2015-01',
        notificationPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ServiceBusNotification-Format': 'gcm', // or 'apple' for iOS
          },
        },
      );
      console.log('Notification sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error);
      return ResponseDto.errorResponse('Failed to send notification');
    }
  }

  async getReminderForCollection(adminId: string): Promise<ResponseDto> {
    try {

      const reminders = await this.reminderModel.find({ adminId}).exec();

      if (!reminders || reminders.length === 0) {
        return ResponseDto.errorResponse("No reminders found")
      }

      return ResponseDto.successResponse("Reminders found", reminders);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while getting reminders")
    }
  }

  async getReminderById(id: string): Promise<ResponseDto> {
    try {

      const reminder = await this.reminderModel.findById(id).exec();

      if (!reminder) {
        return ResponseDto.errorResponse("Reminder not found")
      }

      return ResponseDto.successResponse("Reminder found", reminder);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while getting reminder")
    }

  }

  async updateReminder(id: string, updateReminderDto: UpdateReminderDTO): Promise<ResponseDto> {
    try {

      const updatedReminder = await this.reminderModel.findByIdAndUpdate(id, updateReminderDto, { new: true }).exec();

      if (!updatedReminder) {
        return ResponseDto.errorResponse("Reminder not found")
      }

      return ResponseDto.successResponse("Reminder updated", updatedReminder);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while updating reminder")
    }
  }

  async deleteReminder(id: string): Promise<ResponseDto> {
    try {

      const deletedReminder = await this.reminderModel.findByIdAndDelete(id).exec();

      if (!deletedReminder) {
        return ResponseDto.errorResponse("Reminder not found")
      }

      return ResponseDto.successResponse("Reminder deleted", null);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while deleting reminder")
    }
  }


  /////////////////////////KPIs///////////////////////////////////////////


  // egg rate calculations
  async getEggHatchRate(eggType: string, dateRange: {start: Date, end: Date}): Promise<number>{
    const totalEggs = await this.eggModel.countDocuments({
      animalType: eggType,
      eggCollectionDate: {
        $gte: dateRange.start, 
        $lte: dateRange.end
      }
    });

    const totalHatchedEggs = await this.eggModel.countDocuments({
      animalType: eggType,
      hatchingDate: {$exists: true},
      eggCollectionDate: {
        $gte: dateRange.start, 
        $lte: dateRange.end
      },
    });

    return (totalHatchedEggs / totalEggs) * 100;
  }

  // rejection rate

  async getRejectionRate(eggType: string, dateRange: {start: Date, end: Date}): Promise<number>{
    const totalRejections = await this.eggModel.countDocuments({
      animalType: eggType,
      rejectionStatus: true,
      eggCollectionDate: {
        $gte: dateRange.start, 
        $lte: dateRange.end
      }
    });

    const totalEggs = await this.eggModel.countDocuments({
      animalType: eggType,
      eggCollectionDate: {
        $gte: dateRange.start, 
        $lte: dateRange.end
      }
    });

    return (totalRejections / totalEggs) * 100;
  }

  // days to hatch

  async getDaysToHatch(eggType: string, dateRange: {start: Date, end: Date}): Promise<number>{
    const hatchedEggs = await this.eggModel.find({
      animalType: eggType,
      hatchingDate: {$exists: true},
      eggCollectionDate: {
        $gte: dateRange.start, 
        $lte: dateRange.end
      },
    });

    const totalDays = hatchedEggs.reduce((sum, egg) => {
      const days = (egg.hatchingDate.getTime() - egg.eggCollectionDate.getTime()) / (1000 * 3600 * 24);
      return sum + days;
    }, 0);

    return hatchedEggs.length ? totalDays / hatchedEggs.length : 0;
    }

    // accuracy on hatching on time

    async getAccuracyOnHatching(eggType: string, expectedDays: number, dateRange: {start: Date, end: Date}): Promise<number>{
      const hatchedEggs = await this.eggModel.find({
        animalType: eggType,
        hatchingDate: {$exists: true},
        eggCollectionDate: {
          $gte: dateRange.start, 
          $lte: dateRange.end
        },
      });

      const onTimeHatchCount = hatchedEggs.filter(egg => {
        const days = (egg.hatchingDate.getTime() - egg.eggCollectionDate.getTime()) / (1000 * 3600 * 24);
        return days <= expectedDays;
      }).length;

      return (onTimeHatchCount / hatchedEggs.length) * 100;
    }

    //customer success rate

    async getCustomerSuccessRate(dateRange: {start: Date, end: Date}): Promise<any>{
      const customers = await this.eggModel.aggregate([
        {
          $match: {
            eggCollectionDate: {
              $gte: dateRange.start,
              $lte: dateRange.end
            }, source: 'Customer'
          }
        },
        {
          $group: {
            _id: '$adminId',
            totalEggs: { $sum: `$eggQuantity` },
            successfulHatches: {$sum: {$cond: [{ $ifNull: [`$hatchingDate`, false]}, 1, 0]}}
          }
        },
        {
          $project: {
            adminId: `$_id`,
            successRate: { $multiply: [{ $divide: ['$successfulHatches', '$totalEggs'] }, 100] },
            _id: 0
          }
        }
      ]);

      return customers;
    }




}
