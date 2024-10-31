import { Inject, Injectable } from '@nestjs/common';
import { TRANSACTION_MODEL } from './constants/income-expense.constant';
import { Model, Types } from 'mongoose';
import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ResponseDto, ResponseHandler } from 'src/common/response.dto';
import { USER_MODEL } from 'src/auth/constants/auth.constants';
import { User } from 'src/auth/interfaces/user.interface';


@Injectable()
export class IncomeExpensesService {
  constructor(
    @Inject(TRANSACTION_MODEL)
    private transactionModel: Model<Transaction>,
    @Inject(USER_MODEL)
    private userModel: Model<User>
  ) { }

  ///////////////TRANSACTION////////////////

  async addTransaction(adminId: string, userId: string, createTransactionDto: CreateTransactionDto): Promise<ResponseDto> {
    try {
      const adminExist = await this.userModel.findOne({ adminId });
      if (!adminExist) {
        return ResponseHandler.handleBadRequest("Farm does not exist")
      }
      const transactionInstance = await this.transactionModel.create({
        ...createTransactionDto,
        addedBy: userId,
        adminId: adminId
      });

      const createdTransaction = await this.transactionModel.findById(transactionInstance._id);

      if (!createdTransaction) {
        return ResponseHandler.handleBadRequest("Failed to create transaction");
      }

      return ResponseHandler.handleCreated("Transaction created successfully", createdTransaction);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong while adding transaction")
    }
  }

  async getAllTransactions(adminId: string): Promise<ResponseDto> {
    try {
      const adminExist = await this.userModel.findOne({ adminId });
      if (!adminExist) {
        return ResponseHandler.handleBadRequest("Farm does not exist")
      }
      const transactions = await this.transactionModel.find({ adminId });
      if (!transactions || transactions.length === 0) {
        return ResponseHandler.handleNotFound("No transactions available");
      }

      return ResponseHandler.handleOk(`${transactions.length} transactions fetched`, transactions);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while fetching all transaction records");
    }
  }

  async getTransaction(id: string): Promise<ResponseDto> {
    try {
      const transaction = await this.transactionModel.findById(id);
      if (!transaction) {
        return ResponseHandler.handleNotFound("Transaction not found");
      }

      return ResponseHandler.handleOk("Transaction retrieved", transaction);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while fetching transaction record");
    }
  }


  async getAllIncome(adminId: string): Promise<ResponseDto> {
    try {
      const incomes = await this.transactionModel.find({
        adminId,
        type: 'Income'
      });

      if (!incomes || incomes.length === 0) {
        return ResponseHandler.handleNotFound("No available income records")
      }

      return ResponseHandler.handleOk(`${incomes.length} income records fetched`, incomes);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while fetching all income records");
    }
  }

  async getAllIncomeWithDatesFilters(adminId: string, startDate?: Date, endDate?: Date): Promise<ResponseDto> {
    try {
      const documents = await this.transactionModel.aggregate([
        {
          $match: {
            adminId: new Types.ObjectId(adminId),
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
            type: 'Income'
          }
        },
        {
          $group: {
            _id: "$category",
            documents: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            documents: 1
          }
        }
      ]);

      if (!documents || documents.length === 0) {
        return ResponseHandler.handleNotFound("No records found at the moment");
      }

      return ResponseHandler.handleOk("Income records fetched", documents);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while fetching income records");
    }
  }


  async getAllExpense(adminId: string): Promise<ResponseDto> {
    try {
      const expenses = await this.transactionModel.find({
        adminId,
        type: 'Expense'
      });

      if (!expenses || expenses.length === 0) {
        return ResponseHandler.handleNotFound("No available expense records")
      }

      return ResponseHandler.handleOk(`${expenses.length} expense records fetched`, expenses);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while fetching all expense records");
    }
  }

  async getAllExpenseWithDatesFilters(adminId: string, startDate?: Date, endDate?: Date): Promise<ResponseDto> {
    try {
      const documents = await this.transactionModel.aggregate([
        {
          $match: {
            adminId: new Types.ObjectId(adminId),
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
            type: 'Expense'
          }
        },
        {
          $group: {
            _id: "$category",
            documents: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            documents: 1
          }
        }
      ]);

      if (!documents || documents.length === 0) {
        return ResponseHandler.handleNotFound("No records found at the moment");
      }

      return ResponseHandler.handleOk("Expense records fetched", documents);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while fetching expense records");
    }
  }


  async getAllAssets(adminId: string): Promise<ResponseDto> {
    try {
      const assets = await this.transactionModel.find({
        adminId,
        type: 'Asset'
      });

      if (!assets || assets.length === 0) {
        return ResponseHandler.handleNotFound("No available assets records")
      }

      return ResponseHandler.handleOk(`${assets.length} assets records fetched`, assets);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while fetching all assets records");
    }
  }

  async getAllAssetsWithDatesFilters(adminId: string, startDate?: Date, endDate?: Date): Promise<ResponseDto> {
    try {
      const documents = await this.transactionModel.aggregate([
        {
          $match: {
            adminId: new Types.ObjectId(adminId),
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
            type: 'Asset'
          }
        },
        {
          $group: {
            _id: "$category",
            documents: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            documents: 1
          }
        }
      ]);

      if (!documents || documents.length === 0) {
        return ResponseHandler.handleNotFound("No records found at the moment");
      }

      return ResponseHandler.handleOk("Assets records fetched", documents);
    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while fetching assets records");
    }
  }

  /*

  BALANCE SHEET NOTES
  -Income = increase net worth
  -Expense = reduce net worth
  -Assets = includes any transaction that increases or descreases asset accounts

  BALANCE SHEET SECTIONS
  -Assets
  -Liabilities
  -Networth = Assets - Liabilities

  */

  async generateReport(adminId: string, startDate?: Date, endDate?: Date): Promise<ResponseDto>{
    try {
      const matchConditions = {
        adminId: new Types.ObjectId(adminId),
        ...(startDate && endDate && {date: {$gte: new Date(startDate), $lte: new Date(endDate)}})
      };

      const incomeData = await this.transactionModel.aggregate([
        {
          $match: {
            ...matchConditions,
            type: 'Income'
          }
        },
        {
          $group: {
            _id: "$category",
            totalIncome: {$sum: '$amount'}
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalIncome: 1
          }
        }
      ]);

      const expenseData = await this.transactionModel.aggregate([
        {
          $match: {
            ...matchConditions,
            type: 'Expense'
          }
        },
        {
          $group: {
            _id: "$category",
            totalExpenses: {$sum: '$amount'}
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalExpenses: 1
          }
        }
      ]);

      const totalIncome = incomeData.reduce((acc, item) => acc + item.totalIncome, 0);
      const totalExpense =  expenseData.reduce((acc, item) => acc + item.totalExpenses, 0);

      const netIncome = totalExpense - totalExpense;

      const returnData = {
        totalIncomePerCategory: incomeData,
        totalExpensePerCategory: expenseData,
        totalIncome,
        totalExpense,
        netWorth: netIncome
      }

      return ResponseHandler.handleOk("Report generated", returnData);


    } catch (error) {
      console.log(error);
      return ResponseHandler.handleInternalServerError("Something went wrong, while generating report");
    }
  }


}
