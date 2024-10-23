import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/roles/roles.guard";
import { ContactsService } from "../contacts.service";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateContactDocumentDto } from "../dto/create-contact-document.dto";
import { multerOptions } from "src/files/config/multer.config";
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
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @ApiOperation({
        summary: 'Add Document',
        description: 'Uploads a document associated with the specified contact mongoose id. The uploaded file must be named "file" and its optional to add a file. NB: I am using multer for handling the uploads, so now l am disabling the multerOptions, l will write the logic the delete the file from the server after uoloading it to Supabase the cloud storage service we may use. So if you test a file if its not supported the error will be Unsupported file code - 401, then if its successfull for now the return document should have documentLink = undefined',
    })
    async createContactDocument(@Param('id') id: string, @Body() createDocumentDto: CreateContactDocumentDto, @UploadedFile() File: Express.Multer.File, @Request() req) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.createContactDocument(id, user?.adminId, user?.id, createDocumentDto, File);
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