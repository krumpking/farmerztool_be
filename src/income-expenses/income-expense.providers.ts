import { Connection } from "mongoose";
import { TRANSACTION_MODEL } from "./constants/income-expense.constant";
import { TransactionSchema } from "./schema/transaction.schema";
import { DATABASE_CONNECTION } from "src/common/constants";

export const transactionProviders = [
    {
        provide: TRANSACTION_MODEL,
        useFactory: (connection: Connection) => connection.model('Transaction', TransactionSchema),
        inject: [DATABASE_CONNECTION],
    },
];