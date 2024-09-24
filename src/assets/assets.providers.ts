import { Connection } from "mongoose";
import { ASSET_MANAGEMENT_MODEL } from "./constants/assets.constants";
import { assetSchema } from "./schema/asset-management.schema";
import { DATABASE_CONNECTION } from "src/common/constants";


export const assetManagementProviders = [{
    provide: ASSET_MANAGEMENT_MODEL,
    useFactory: (connection: Connection) => connection.model('Asset', assetSchema),
    inject: [DATABASE_CONNECTION],
},
];