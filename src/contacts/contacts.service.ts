import { Inject, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CONTACT_MODEL } from './constants/contacts.constant';
import { Model, Types } from 'mongoose';
import { Contacts } from './interfaces/contact.interface';
import { ResponseDto, ResponseHandler } from 'src/common/response.dto';


@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACT_MODEL)
    private contactModel: Model<Contacts>,
  ) {}
  
  async createContact(adminId: string, userId: string ,createContactDto: CreateContactDto): Promise<ResponseDto> {
    try {
      const existingContact = await this.contactModel.findOne({
        ...createContactDto,
        adminId: adminId,
        addedBy: userId,
      });

      if(existingContact){
        return ResponseHandler.handleBadRequest("Contact already exists");
      }

      const contactInstance = await this.contactModel.create({
        ...createContactDto,
        adminId: adminId,
        addedBy: userId,
      });

      const createdContact = await this.contactModel.findById(contactInstance._id);

      if (!createdContact) {
        return ResponseHandler.handleBadRequest("Failed to create contact");
      }

      return ResponseHandler.handleCreated("Contact created successfully", createdContact);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while creating contact");
    }
  }

  async getAllContacts(adminId: string): Promise<ResponseDto> {
    try {
      const contacts = await this.contactModel.find({ adminId });
      if (!contacts || contacts.length === 0) {
        return ResponseHandler.handleNotFound("No available contacts");
      }
      return ResponseHandler.handleOk("Contacts fetched", contacts);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching contacts");
    }
  }

  async getContact(adminId: string, id: string): Promise<ResponseDto> {
    try {
      const contact = await this.contactModel.findOne({ _id: id, adminId });
      if (!contact) {
        return ResponseHandler.handleNotFound("Contact not found");
      }
      return ResponseHandler.handleOk("Contact fetched", contact);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching contact");
    }
  }

  async getContactsGroupedByType(adminId: string): Promise<ResponseDto> {
    try {
      const contacts = await this.contactModel
        .aggregate([
         {
          $match: {
            adminId: new Types.ObjectId(adminId)
          }
         },
         {
          $group: {
            _id: "$contactType",
            contacts: {
              $push: "$$ROOT"
            }
          }
         },
         {
          $project: {
            _id: 0,
            contactType: "$_id",
            contacts: 1
          }
         }
        ]);

        console.log(contacts);
        

      if (!contacts || contacts.length === 0) {
        return ResponseHandler.handleNotFound("No available contacts");
      }
      return ResponseHandler.handleOk("Contacts fetched", contacts);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching contacts");
    }
  }

  async updateContact(adminId: string, id: string, updateContactDto: UpdateContactDto): Promise<ResponseDto> {
    try {
      const contact = await this.contactModel.findOneAndUpdate({ _id: id, adminId }, updateContactDto, { new: true });
      if (!contact) {
        return ResponseHandler.handleNotFound("Contact not found");
      }
      return ResponseHandler.handleOk("Contact updated successfully", contact);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while updating contact");
    }
  }

  async deleteContact(adminId: string, id: string): Promise<ResponseDto> {
    try {
      const contact = await this.contactModel.findOneAndDelete({ _id: id, adminId });
      if (!contact) {
        return ResponseHandler.handleNotFound("Contact not found");
      }
      return ResponseHandler.handleNoContent("Contact deleted successfully");
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while deleting contact");
    }
  }




}
