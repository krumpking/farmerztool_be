import { Connection } from "mongoose";
import { CONTACT_FINANCES_MODEL, CONTACT_MODEL } from "./constants/contacts.constant";
import { DATABASE_CONNECTION } from "src/common/constants";
import { contactSchema } from "./schema/contacts.schema";
import { financialActivitySchema } from "./schema/contact-finances.schema";

export const contactsProviders = [
    {
        provide: CONTACT_MODEL,
        useFactory: (connection: Connection) => connection.model('Contact', contactSchema),
        inject: [DATABASE_CONNECTION],
    },
];

export const contactFinancialActivityProviders = [
    {
        provide: CONTACT_FINANCES_MODEL,
        useFactory: (connection: Connection) => connection.model('ContactFinancialActivity', financialActivitySchema),
        inject: [DATABASE_CONNECTION],
    },
]