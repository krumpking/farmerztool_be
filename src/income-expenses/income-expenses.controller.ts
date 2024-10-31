import { Controller, Get, Post, Body,  Param, UseGuards, Request, Query } from '@nestjs/common';
import { IncomeExpensesService } from './income-expenses.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/roles/roles.guard';
import { Permissions, Roles } from 'src/roles/roles.decorators';
import { Role } from 'src/roles/roles.enum';
import { Permission } from 'src/roles/permissions.enum';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('INCOME & EXPENSE')
@ApiBearerAuth()
@Controller('/api/v1/income-expenses')
@UseGuards(RolesGuard)
export class IncomeExpensesController {
  constructor(private readonly incomeExpensesService: IncomeExpensesService) { }


  private getUserFromRequest(req): any {
    return req.user;
  }


  @Post('add')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Create)
  @ApiOperation({
    summary: "Create a new transaction",
    description: "Create a new transaction",
  })
  @ApiResponse({ status: 201, description: "Transaction created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async addTransaction(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.addTransaction(user?.adminId, user?.id, createTransactionDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all transactions",
    description: "Fetch all transactions for the admin",
  })
  @ApiResponse({ status: 200, description: "Transactions fetched successfully" })
  @ApiResponse({ status: 404, description: "No transactions available" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAllTransactions(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.getAllTransactions(user?.adminId);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get a transaction by ID",
    description: "Fetch a specific transaction by its mongoose ID",
  })
  @ApiResponse({ status: 200, description: "Transaction retrieved successfully" })
  @ApiResponse({ status: 404, description: "Transaction not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getTransaction(@Param('id') id: string) {
    return this.incomeExpensesService.getTransaction(id);
  }

  @Get('income/all')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all income records",
    description: "Fetch all income records for the admin",
  })
  @ApiResponse({ status: 200, description: "Income records fetched successfully" })
  @ApiResponse({ status: 404, description: "No available income records" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAllIncome(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.getAllIncome(user?.adminId);
  }

  @Get('income/dates')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all income records with date filters",
    description: "Fetch income records filtered by date range",
  })
  @ApiResponse({ status: 200, description: "Income records fetched successfully" })
  @ApiResponse({ status: 404, description: "No records found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAllIncomeWithDatesFilters(@Request() req, @Query('startDate') startDate?: Date, @Query('endDate') endDate?: Date) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.getAllIncomeWithDatesFilters(user?.adminId, startDate, endDate);
  }

  @Get('expense/all')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all expense records",
    description: "Fetch all expense records for the admin",
  })
  @ApiResponse({ status: 200, description: "Expense records fetched successfully" })
  @ApiResponse({ status: 404, description : "No available expense records" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAllExpense(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.getAllExpense(user?.adminId);
  }

  @Get('expense/dates')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all expense records with date filters",
    description: "Fetch expense records filtered by date range",
  })
  @ApiResponse({ status: 200, description: "Expense records fetched successfully" })
  @ApiResponse({ status: 404, description: "No records found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAllExpenseWithDatesFilters(@Request() req, @Query('startDate') startDate?: Date, @Query('endDate') endDate?: Date) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.getAllExpenseWithDatesFilters(user?.adminId, startDate, endDate);
  }

  @Get('assets/all')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all assets records",
    description: "Fetch all assets records for the admin",
  })
  @ApiResponse({ status: 200, description: "Assets records fetched successfully" })
  @ApiResponse({ status: 404, description: "No available assets records" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAllAssets(@Request() req) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.getAllAssets(user?.adminId);
  }

  @Get('assets/dates')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Get all assets records with date filters",
    description: "Fetch assets records filtered by date range",
  })
  @ApiResponse({ status: 200, description: "Assets records fetched successfully" })
  @ApiResponse({ status: 404, description: "No records found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async getAllAssetsWithDatesFilters(@Request() req, @Query('startDate') startDate?: Date, @Query('endDate') endDate?: Date) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.getAllAssetsWithDatesFilters(user?.adminId, startDate, endDate);
  }

  @Get('report/income-expense')
  @Roles(Role.Admin, Role.CommunicationManager, Role.Finance, Role.FarmManager)
  @Permissions(Permission.Read)
  @ApiOperation({
    summary: "Generate a report",
    description: "Generate a report based on transactions",
  })
  @ApiResponse({ status: 200, description: "Report generated successfully" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async generateReport(@Request() req, @Query('startDate') startDate?: Date, @Query('endDate') endDate?: Date) {
    const user = this.getUserFromRequest(req);
    return this.incomeExpensesService.generateReport(user?.adminId, startDate, endDate);
  }


}
