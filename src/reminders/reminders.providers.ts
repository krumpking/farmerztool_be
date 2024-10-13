import { Connection } from "mongoose";
import { REMINDER_MODEL } from "./constants/reminders.constants";
import { reminderSchema } from "./schema/reminder.schema";
import { DATABASE_CONNECTION } from "src/common/constants";

export const reminderProviders = [
    {
        provide: REMINDER_MODEL,
        useFactory: (connection: Connection) =>
            connection.model('Reminder', reminderSchema),
        inject: [DATABASE_CONNECTION],
    }
]