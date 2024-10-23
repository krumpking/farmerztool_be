import { RolesGuard } from "src/roles/roles.guard";
import { ContactsService } from "../contacts.service";
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Permissions, Roles } from "src/roles/roles.decorators";
import { Role } from "src/roles/roles.enum";
import { Permission } from "src/roles/permissions.enum";
import { CreateFinancialActivityDto } from "../dto/create-contact-finances.dto";
import { UpdateFinancialActivityDto } from "../dto/update-contact-finances.dto";


@ApiTags("CONTACTS FINANCIAL ACTIVITES")
@ApiBearerAuth()
@Controller('/api/v1/contacts')
@UseGuards(RolesGuard)
export class FinancialActivityController {
    constructor(private readonly contactsService: ContactsService) { }

    private getUserFromRequest(req): any {
        return req.user;
    }

    @Post(':id/finances/add')
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Create)
    @ApiOperation({
        summary: 'Add Financial Activity',
        description: 'Add new Financial Activity to Contact. NB: The id is the mongoose id of the contact',
    })
    async addFinancialActivity(
        @Param('id') id: string,
        @Body() createFinancialActivityDto: CreateFinancialActivityDto,
        @Request() req
    ) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.createFinancialActivity(id, user?.adminId, user?.id, createFinancialActivityDto);
    }

    @Get(':id/finances/contact/all')
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get all Financial Activities for a Contact',
        description: 'Get all Financial Activities for a Contact. NB: The id is the mongoose id of the contact',
    })
    async getAllFinancialActivitiesPerContact(
        @Param('id') id: string,
        @Request() req
    ) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.getAllFinancialActivitiesPerContact(id, user?.adminId);
    }

    @Get('finances/all/farm')
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get all Financial Activities for a Farm',
        description: 'Get all Financial Activities for a Farm.',
    })
    async getAllFinancialActivitiesPerFarm(
        @Request() req
    ) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.getFinancialActivityForAdmin(user?.adminId);
    }

    @Get('finances/:id')
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Read)
    @ApiOperation({
        summary: 'Get Financial Activity',
        description: 'Get Financial Activity. NB: The id is the mongoose id of the Financial Activity',
    })
    async getFinancialActivity(
        @Param('id') id: string,
    ) {
        return this.contactsService.getFinancialActivity(id);
    }

    @Patch('finances/:id')
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Update)
    @ApiOperation({
        summary: 'Update Financial Activity',
        description: 'Update Financial Activity. NB: The id is the mongoose id of the Financial Activity',
    })
    async updateFinancialActivity(
        @Param('id') id: string,
        @Body() updateFinancialActivityDto: UpdateFinancialActivityDto,
        @Request() req
    ) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.updateFinancialActivity(user?.adminId, id, updateFinancialActivityDto);
    }

    @Delete('finances/:id')
    @Roles(Role.Admin, Role.Finance)
    @Permissions(Permission.Delete)
    @ApiOperation({
        summary: 'Delete Financial Activity',
        description: 'Delete Financial Activity. NB: The id is the mongoose id of the Financial Activity',
    })
    async deleteFinancialActivity(
        @Param('id') id: string,
        @Request() req
    ) {
        const user = this.getUserFromRequest(req);
        return this.contactsService.deleteFinancialActivity(user?.adminId, id);
    }


}