import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/roles/roles.guard";
import { ContactsService } from "../contacts.service";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { CreateContactDocumentDto } from "../dto/create-contact-document.dto";
import { UpdateContactDocumentDto } from "../dto/update-contact-documents.dto";

@ApiTags("CONTACTS DOCUMENTS")
@ApiBearerAuth()
@Controller('/api/v1/contacts')
@UseGuards(RolesGuard)
export class ContactDocumentsController {
    constructor(private readonly contactsService: ContactsService) { }

    private getUserFromRequest(req): any {
        return req.user;
    }

    //////////////////// Contact Documnets ////////////////////

    @Post(':id/documents/add')
    @Roles(Role.Admin, Role.Finance, Role.FarmManager)
    @Permissions(Permission.Create)
    @ApiOperation({
        summary: 'Add Document',
        description: 'Uploads a document associated with the specified contact mongoose id',
    })
    async createContactDocument(@Param('id') id: string, @Body() createDocumentDto: CreateContactDocumentDto,  @Request() req) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.createContactDocument(id, user?.adminId, user?.id, createDocumentDto);
    }


    @Get(':id/documents/contact/all')
    @Roles(Role.Admin, Role.Finance, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get Contact Documents',
        description: 'Returns all documents associated with the specified contact mongoose id',
    })
    async getContactDocuments(@Param('id') id: string, @Request() req) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.getAllContactDocumentsPerContact(id, user?.adminId);
    }

    @Get('documents/:id')
    @Roles(Role.Admin, Role.Finance, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get Document',
        description: 'Returns the document associated with the specified document mongoose id',
    })
    async getDocument(@Param('id') id: string) {
        return this.contactsService.getContactDocument(id);
    }

    @Get('documents/all/farm')
    @Roles(Role.Admin, Role.Finance, Role.FarmManager)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get All Farm Documents',
        description: 'Returns all documents associated with the farm',
    })
    async getAllFarmDocuments(@Request() req) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.getContactDocumentsForAdmin(user?.adminId);
    }

    @Patch('documents/:id')
    @Roles(Role.Admin, Role.Finance, Role.FarmManager)
    @Permissions(Permission.Update)
    @ApiOperation({
        summary: 'Update Document',
        description: 'Updates the document associated with the specified document mongoose id',
    })
    async updateDocument(@Param('id') id: string, @Body() updateDocumentDto: UpdateContactDocumentDto, @Request() req) {
        
        const user = this.getUserFromRequest(req);
        return this.contactsService.updateContactDocument(user?.id, id , updateDocumentDto);
    }

    @Delete('documents/:id')
    @Roles(Role.Admin, Role.Finance, Role.FarmManager)
    @Permissions(Permission.Delete)
    @ApiOperation({
        summary: 'Delete Document',
        description: 'Deletes the document associated with the specified document mongoose id',
    })
    async deleteDocument(@Param('id') id: string, @Request() req) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.deleteContactDocument(user?.id, id);
    }
    
}