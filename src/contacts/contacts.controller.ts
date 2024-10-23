import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Permissions, Roles} from 'src/roles/roles.decorators';
import { Permission } from 'src/roles/permissions.enum';
import { Role } from 'src/roles/roles.enum';

@ApiTags("CONTACTS")
@ApiBearerAuth()
@Controller('/api/v1/contacts')
@UseGuards(RolesGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  private getUserFromRequest(req): any {
    return req.user;
  }


  @Post('add')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Create)
  @ApiOperation(
    {
      summary: "Create a new contact",
      description: "Create a new contact",
      responses: {
        201: {
          description: "Contact created successfully"
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  )
  async createContact(@Request() req, @Body() createContactDto: CreateContactDto) {
    const user = this.getUserFromRequest(req);    
    return this.contactsService.createContact(user?.adminId ,user?.id, createContactDto);
  }


  @Get('all/contacts')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation(
    {
      summary: "Get all contacts",
      description: "Get all contacts for a specific admin",
      responses: {
        200: {
          description: "Contacts fetched successfully"
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  )
  async getAllContacts(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.contactsService.getAllContacts(user?.adminId);
  }


  @Get(':id')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation(
    {
      summary: "Get contact by id",
      description: "Get contact by mongose id",
      responses: {
        200: {
          description: "Contact fetched successfully"
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  )
  async getContact(@Request() req, @Param('id') id: string) {
    const user = this.getUserFromRequest(req);
    return this.contactsService.getContact(user?.adminId, id);
  }


  @Get('all/contacts/grouped')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation(
    {
      summary: "Get contacts grouped by type",
      description: "Get contacts grouped by type",
      responses: {
        200: {
          description: "Contacts fetched successfully"
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  )
  async getContactsGroupedByType(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.contactsService.getContactsGroupedByType(user?.adminId);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Update)
  @ApiOperation(
    {
      summary: "Update contact by id",
      description: "Update contact mongoose id",
      responses: {
        200: {
          description: "Contact updated successfully"
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  )
  async updateContact(@Request() req, @Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    const user = this.getUserFromRequest(req);
    return this.contactsService.updateContact(user?.adminId, id, updateContactDto);
  }


  @Delete(':id')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Delete)
  @ApiOperation(
    {
      summary: "Delete contact by id",
      description: "Delete contact by mongoose id",
      responses: {
        200: {
          description: "Contact deleted successfully"
        },
        401: {
          description: "Unauthorized"
        }
      }
    }
  )
  async deleteContact(@Request() req, @Param('id') id: string) {
    const user = this.getUserFromRequest(req);
    return this.contactsService.deleteContact(user?.adminId, id);
  }




}
