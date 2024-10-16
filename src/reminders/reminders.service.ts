import { Inject, Injectable } from '@nestjs/common';
import { REMINDER_MODEL } from 'src/hatchery/constants/hatchery.constants';
import { Model } from 'mongoose';
import { CreateReminderDTO } from 'src/reminders/dto/create-reminder.dto';
import { ResponseDto } from 'src/common/response.dto';
import { UpdateReminderDTO } from 'src/reminders/dto/update-reminder.dto';
import { Reminder } from './interfaces/reminder.interface';

@Injectable()
export class RemindersService {
  constructor(
    @Inject(REMINDER_MODEL)
    private reminderModel: Model<Reminder>,
  ) {}
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

      return ResponseDto.successResponse("Reminder created", createdReminder);

    } catch (error) {
      console.log(error);
      return ResponseDto.errorResponse("Something went wrong, while creating reminder");
    }
  }


  async getReminderForCollection(adminId: string): Promise<ResponseDto> {
    try {

      const reminders = await this.reminderModel.find({ adminId }).exec();

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
}
