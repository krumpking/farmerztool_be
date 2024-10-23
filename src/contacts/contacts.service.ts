import { Inject, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CONTACT_ACTIVITY, CONTACT_DOCUMENT_MODEL, CONTACT_FINANCES_MODEL, CONTACT_MODEL } from './constants/contacts.constant';
import { Model, Types } from 'mongoose';
import { Contacts } from './interfaces/contact.interface';
import { ResponseDto, ResponseHandler } from 'src/common/response.dto';
import { FinancialActivity } from './interfaces/contact-finances.interface';
import { UpdateFinancialActivityDto } from './dto/update-contact-finances.dto';
import { ContactActivity } from './interfaces/contact-activities.interface';
import { ContactDocument } from './interfaces/contact-document.interface';
import { CreateContactDocumentDto } from './dto/create-contact-document.dto';
import { UpdateContactDocumentDto } from './dto/update-contact-documents.dto';


@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACT_MODEL)
    private contactModel: Model<Contacts>,
    @Inject(CONTACT_FINANCES_MODEL)
    private financialActivityModel: Model<FinancialActivity>,
    @Inject(CONTACT_ACTIVITY)
    private activityModel: Model<ContactActivity>,
    @Inject(CONTACT_DOCUMENT_MODEL)
    private documentModel: Model<ContactDocument>,
  ) { }

  async createContact(adminId: string, userId: string, createContactDto: CreateContactDto): Promise<ResponseDto> {
    try {
      const existingContact = await this.contactModel.findOne({
        ...createContactDto,
        adminId: adminId,
        addedBy: userId,
      });

      if (existingContact) {
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



  ////////////////////////////FinancialActivity///////////////////////////////////


  async createFinancialActivity(id: string, adminId: string, userId: string, createFinancialActivityDto: any): Promise<ResponseDto> {
    try {
      const contact = await this.contactModel.findById(id);
      if (!contact) {
        return ResponseHandler.handleNotFound("Contact not found");
      }

      const existingFinancialRecord = await this.financialActivityModel.findOne({
        ...createFinancialActivityDto,
        addedBy: userId,
        adminId: adminId,
        contactId: id
      });

      if (existingFinancialRecord) {
        return ResponseHandler.handleBadRequest("Financial activity already exists");
      }

      const financialActivityInstance = await this.financialActivityModel.create({
        ...createFinancialActivityDto,
        addedBy: userId,
        adminId: adminId,
        contactId: id
      });

      const createdFinancialActivity = await this.financialActivityModel.findById(financialActivityInstance._id);

      if (!createdFinancialActivity) {
        return ResponseHandler.handleBadRequest("Failed to create financial activity");
      }

      return ResponseHandler.handleCreated("Financial activity created successfully", createdFinancialActivity);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while creating financial activity");
    }
  }

  async getAllFinancialActivitiesPerContact(id: string, adminId: string): Promise<ResponseDto> {
    try {
      const contact = await this.contactModel.findById(id);
      if (!contact) {
        return ResponseHandler.handleNotFound("Contact not found");
      }

      const financialActivities = await this.financialActivityModel.find({ contactId: id, adminId });
      if (!financialActivities || financialActivities.length === 0) {
        return ResponseHandler.handleNotFound("No available financial activities");
      }
      return ResponseHandler.handleOk("Financial activities fetched", financialActivities);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching financial activities");
    }
  }

  async getFinancialActivityForAdmin(adminId: string): Promise<ResponseDto> {
    try {
      const financialActivities = await this.financialActivityModel.find({ adminId });
      if (!financialActivities || financialActivities.length === 0) {
        return ResponseHandler.handleNotFound("No available financial activities");
      }
      return ResponseHandler.handleOk("Financial activities fetched", financialActivities);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching financial activities");
    }
  }

  async getFinancialActivity(id: string): Promise<ResponseDto> {
    try {
      const financialActivity = await this.financialActivityModel.findById(id);
      if (!financialActivity) {
        return ResponseHandler.handleNotFound("Financial activity not found");
      }
      return ResponseHandler.handleOk("Financial activity fetched", financialActivity);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching financial activity");
    }
  }

  async updateFinancialActivity(adminId: string, id: string, updateFinancialActivityDto: UpdateFinancialActivityDto): Promise<ResponseDto> {
    try {
      const financialActivity = await this.financialActivityModel.findOneAndUpdate({ _id: id, adminId }, updateFinancialActivityDto, { new: true });
      if (!financialActivity) {
        return ResponseHandler.handleNotFound("Financial activity not found");
      }
      return ResponseHandler.handleOk("Financial activity updated successfully", financialActivity);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while updating financial activity");
    }
  }

  async deleteFinancialActivity(adminId: string, id: string): Promise<ResponseDto> {
    try {
      const financialActivity = await this.financialActivityModel.findOneAndDelete({ _id: id, adminId });
      if (!financialActivity) {
        return ResponseHandler.handleNotFound("Financial activity not found");
      }
      return ResponseHandler.handleNoContent("Financial activity deleted successfully");
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while deleting financial activity");
    }
  }

  ////////////////////////////////////////Contact Activity //////////////////////////////////////////


  async createContactActivity(id: string, adminId: string, userId: string, createContactActivityDto: any): Promise<ResponseDto> {
    try {
      const contact = await this.contactModel.findById(id);
      if (!contact) {
        return ResponseHandler.handleNotFound("Contact not found");
      }

      const existingContactActivity = await this.activityModel.findOne({
        ...createContactActivityDto,
        adminId: adminId,
        addedBy: userId,
        contactId: contact._id
      });

      if (existingContactActivity) {
        return ResponseHandler.handleBadRequest("Contact activity already exists");
      }

      const contactActivityInstance = await this.activityModel.create({
        ...createContactActivityDto,
        adminId: adminId,
        addedBy: userId,
        contactId: contact._id
      });

      const createdContactActivity = await this.activityModel.findById(contactActivityInstance._id);

      if (!createdContactActivity) {
        return ResponseHandler.handleBadRequest("Failed to create contact activity");
      }

      return ResponseHandler.handleCreated("Contact activity created successfully", createdContactActivity);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while creating contact activity");
    }
  }

  async getAllContactActivitiesPerContact(id: string, adminId: string): Promise<ResponseDto> {
    try {

      const contact = await this.contactModel.findById(id);

      if (!contact) {
        return ResponseHandler.handleNotFound("Contact not found");
      }

      const contactActivities = await this.activityModel.find({ contactId: id, adminId });
      if (!contactActivities || contactActivities.length === 0) {
        return ResponseHandler.handleNotFound("No available contact activities");
      }
      return ResponseHandler.handleOk("Contact activities fetched", contactActivities);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching contact activities");
    }
  }

  async getContactActivity(id: string): Promise<ResponseDto> {
    try {
      const contactActivity = await this.activityModel.findById(id);
      if (!contactActivity) {
        return ResponseHandler.handleNotFound("Contact activity not found");
      }
      return ResponseHandler.handleOk("Contact activity fetched", contactActivity);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching contact activity");
    }
  }

  async getContactActivitiesForAdmin(adminId: string): Promise<ResponseDto> {
    try {
      const contactActivities = await this.activityModel.find({ adminId });
      if (!contactActivities || contactActivities.length === 0) {
        return ResponseHandler.handleNotFound("No available contact activities");
      }
      return ResponseHandler.handleOk("Contact activities fetched", contactActivities);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching contact activities");
    }
  }

  async updateContactActivity(adminId: string, id: string, updateContactActivityDto: any): Promise<ResponseDto> {
    try {
      const contactActivity = await this.activityModel.findOneAndUpdate({ _id: id, adminId }, updateContactActivityDto, { new: true });
      if (!contactActivity) {
        return ResponseHandler.handleNotFound("Contact activity not found");
      }
      return ResponseHandler.handleOk("Contact activity updated successfully", contactActivity);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while updating contact activity");
    }
  }

  async deleteContactActivity(adminId: string, id: string): Promise<ResponseDto> {
    try {
      const contactActivity = await this.activityModel.findOneAndDelete({ _id: id, adminId });
      if (!contactActivity) {
        return ResponseHandler.handleNotFound("Contact activity not found");
      }
      return ResponseHandler.handleNoContent("Contact activity deleted successfully");
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while deleting contact activity");
    }
  }


  ///////////////////////contact documents////////////////////////////////


  async createContactDocument(id: string, adminId: string, userId: string, createContactDocumentDto: CreateContactDocumentDto, file: Express.Multer.File): Promise<ResponseDto> {
    try {
      let downloadLink: string = null;
      const contact = await this.contactModel.findById(id);

      if (!contact) {
        return ResponseHandler.handleNoContent("Contact not found");
      }

      if(file){
        downloadLink = this.getDownloadLink(file.filename);
      }

      const existingDocument = await this.documentModel.findOne({
        ...createContactDocumentDto,
        adminId: adminId,
        addedBy: userId,
        contactId: id,
      });

      if (existingDocument) {
        return ResponseHandler.handleBadRequest("A document with exact information exists");
      }

      const documentInstance = await this.documentModel.create({
        ...createContactDocumentDto,
        addedBy: userId,
        contactId: contact._id,
        adminId: adminId,
        documentLink: downloadLink
      });

      const createdDocument = await this.documentModel.findById(documentInstance._id);

      if (!createdDocument) {
        return ResponseHandler.handleBadRequest("Failed to create document");
      }

      return ResponseHandler.handleCreated("Document successfully created", createdDocument);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while creating conatct document")
    }
  }

  private getDownloadLink(fileName: string): string {
    const baseUrl = 'http://localhost:3000/uploads';
    return `${baseUrl}/${encodeURIComponent(fileName)}`;
  }

  async getAllContactDocumentsPerContact(id: string, adminId: string): Promise<ResponseDto> {
    try {
      const contact = await this.contactModel.findById(id);
      if (!contact) {
        return ResponseHandler.handleNotFound("Contact not found");
      }

      const documents = await this.documentModel.find({ contactId: id, adminId });
      if (!documents || documents.length === 0) {
        return ResponseHandler.handleNotFound("No available documents");
      }
      return ResponseHandler.handleOk("Documents fetched", documents);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching documents");
    }
  }

  async getContactDocument(id: string): Promise<ResponseDto> {
    try {
      const document = await this.documentModel.findById(id);
      if (!document) {
        return ResponseHandler.handleNotFound("Document not found");
      }
      return ResponseHandler.handleOk("Document fetched", document);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching document");
    }
  }

  async getContactDocumentsForAdmin(adminId: string): Promise<ResponseDto> {
    try {
      const documents = await this.documentModel.find({ adminId });
      if (!documents || documents.length === 0) {
        return ResponseHandler.handleNotFound("No available documents");
      }
      return ResponseHandler.handleOk("Documents fetched", documents);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while fetching documents");
    }
  }

  async updateContactDocument(adminId: string, id: string, updateContactDocumentDto: UpdateContactDocumentDto): Promise<ResponseDto> {
    try {
      const document = await this.documentModel.findOneAndUpdate({ _id: id, adminId }, updateContactDocumentDto, { new: true });
      if (!document) {
        return ResponseHandler.handleNotFound("Document not found");
      }
      return ResponseHandler.handleOk("Document updated successfully", document);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while updating document");
    }
  }

  async deleteContactDocument(adminId: string, id: string): Promise<ResponseDto> {
    try {
      const document = await this.documentModel.findOneAndDelete({ _id: id, adminId });
      if (!document) {
        return ResponseHandler.handleNotFound("Document not found");
      }
      return ResponseHandler.handleNoContent("Document deleted successfully");
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while deleting document");
    }
  }

}

