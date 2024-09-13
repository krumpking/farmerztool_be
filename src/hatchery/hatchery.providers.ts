import { Connection } from "mongoose";
import { HATCHERY_MODEL } from "./constants/hatchery.constants";
import { HatcherySchema } from "./schema/hatchery.schema";
import { DATABASE_CONNECTION } from "src/common/constants";

export const hatcheryProviders = [
    {
        provide: HATCHERY_MODEL,
        useFactory: (connection: Connection) =>
            connection.model('Hatchery', HatcherySchema),
        inject: [DATABASE_CONNECTION],
    },
];