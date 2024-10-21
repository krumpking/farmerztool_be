import { Connection } from "mongoose";
import { CONTACT_MODEL } from "./constants/contacts.constant";
import { DATABASE_CONNECTION } from "src/common/constants";
import { contactSchema } from "./schema/contacts.schema";

export const contactsProviders = [
    {
        provide: CONTACT_MODEL,
        useFactory: (connection: Connection) => connection.model('Contact', contactSchema),
        inject: [DATABASE_CONNECTION],
    },
]