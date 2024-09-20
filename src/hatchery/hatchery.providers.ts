import { Connection } from "mongoose";
import { HATCHERY_MODEL, REMINDER_MODEL } from "./constants/hatchery.constants";
import { HatcherySchema } from "./schema/hatchery.schema";
import { DATABASE_CONNECTION } from "src/common/constants";
import { reminderSchema } from "./schema/reminder.schema";

export const hatcheryProviders = [
    {
        provide: HATCHERY_MODEL,
        useFactory: (connection: Connection) =>
            connection.model('Hatchery', HatcherySchema),
        inject: [DATABASE_CONNECTION],
    },
];

export const reminderProviders = [
    {
        provide: REMINDER_MODEL,
        useFactory: (connection: Connection) =>
            connection.model('Reminder', reminderSchema),
        inject: [DATABASE_CONNECTION],
    }
]