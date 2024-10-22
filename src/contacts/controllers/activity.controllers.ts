import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/roles/roles.guard";
import { ContactsService } from "../contacts.service";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Permission } from "src/roles/permissions.enum";
import { CreateContactActivityDTO } from "../dto/create-contact-activities.dto";
import { Role } from "src/roles/roles.enum";
import { UpdateContactActivityDto } from "../dto/update-contact-activities.dto";

@ApiTags("CONTACTS ACTIVITES")
@ApiBearerAuth()
@Controller('/api/v1/contacts')
@UseGuards(RolesGuard)
export class ContactActivityController {
    constructor(private readonly contactsService: ContactsService) { }

    private getUserFromRequest(req): any {
        return req.user;
    }

    //////////////////// Contact Activity ////////////////////

    @Post(':id/activity/add')
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Create)
    @ApiOperation({
        summary: 'Add Contact Activity',
        description: 'Add new Contact Activity. NB: id is the mongoose id for the contact'
    })
    async addActivity(@Param('id') id: string, @Body() createActivityDto: CreateContactActivityDTO, @Request() req) {
        const user = this.getUserFromRequest(req);
        return await this.contactsService.createContactActivity(id, user?.adminId, user?.id, createActivityDto);
    }

    @Get(":id/activity/farm/all")
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get All Contact Activities',
        description: 'Get All Contact Activities. NB: id is the mongoose id for the contact'
    })
    async getAllContactActivities(@Param('id') id: string, @Request() req) {
        const user = this.getUserFromRequest(req);
        return await this.contactsService.getAllContactActivitiesPerContact(id, user?.adminId);
    }

    @Get("activity/all/farm")
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get All Contact Activities for an admin',
        description: 'Get All Contact Activities'
    })
    async getAllContactActivitiesPerFarm(@Request() req) {
        const user = this.getUserFromRequest(req);
        return await this.contactsService.getContactActivitiesForAdmin(user?.adminId);
    }

    @Get("activity/:id")
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get Contact Activity',
        description: 'Get Contact Activity. NB: id is the mongoose id for the activity'
    })
    async getContactActivity(@Param('id') id: string) {
        return await this.contactsService.getContactActivity(id);
    }

   
    @Patch("activity/:id")
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Update)
    @ApiOperation({
        summary: 'Update Contact Activity',
        description: 'Get Contact Activity. NB: id is the mongoose id for the activity'
    })
    async updateContactActivity(@Param('id') id: string, @Body() updateActivityDto: UpdateContactActivityDto, @Request() req) {
        const user = this.getUserFromRequest(req);
        return await this.contactsService.updateContactActivity(user?.adminId, id, updateActivityDto);
    }

    @Delete("activity/:id")
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Delete)
    @ApiOperation({
        summary: 'Delete Contact Activity',
        description: 'Get Contact Activity. NB: id is the mongoose id for the activity'
    })
    async deleteContactActivity(@Param('id') id: string, @Request() req) {
        const user = this.getUserFromRequest(req);
        return await this.contactsService.deleteContactActivity(user?.adminId, id);
    }




}
