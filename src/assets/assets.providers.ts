import { Connection } from "mongoose";
import { ASSET_FINANCIAL_MODEL, ASSET_INSPECTION_MODEL, ASSET_LOCATION_MODEL, ASSET_MANAGEMENT_MODEL } from "./constants/assets.constants";
import { assetSchema } from "./schema/asset-management.schema";
import { DATABASE_CONNECTION } from "src/common/constants";
import { assetInspectionSchema } from "./schema/asset-inspection.schema";
import { assetFinancialSchema } from "./schema/asset-financial.schema";
import { assetLocationSchema } from "./schema/asset-location.schema";


export const assetManagementProviders = [{
    provide: ASSET_MANAGEMENT_MODEL,
    useFactory: (connection: Connection) => connection.model('Asset', assetSchema),
    inject: [DATABASE_CONNECTION],
},
];

export const assetInspectionProviders = [{
    provide: ASSET_INSPECTION_MODEL,
    useFactory: (connection: Connection) => connection.model('AssetInspection', assetInspectionSchema),
    inject: [DATABASE_CONNECTION],
},
];

export const assetFinancialProviders = [{
    provide: ASSET_FINANCIAL_MODEL,
    useFactory: (connection: Connection) => connection.model('AssetFinancial', assetFinancialSchema),
    inject: [DATABASE_CONNECTION],
}];

export const assetLocationProviders = [{
    provide: ASSET_LOCATION_MODEL,
    useFactory: (connection: Connection) => connection.model('AssetLocation', assetLocationSchema),
    inject: [DATABASE_CONNECTION],
}]