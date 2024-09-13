import { Connection } from "mongoose";
import { DATABASE_CONNECTION } from "src/common/constants";
import { CropSchema } from "./schema/crops.schema";
import { CROP_MODEL, IRRIGATION_MODEL, FERTILIZER_PESTICIDE_MODEL, FINANCIAL_MODE, ACTIVITY_MODEL, PEST_DISEASE_MODEL } from "./constants/crop.constants";
import { IrrigationSchema } from "./schema/irrigation.schema";
import { FertiliserPesticideSchema } from "./schema/fertiliser-pesticide.schema";
import { FinancialSchema } from "./schema/financila.schema";
import { activitySchema } from "./schema/activity.schema";
import { pestDiseaseIssueSchema } from "./schema/pest-disease.schema";




export const cropProviders = [
    {
        provide: CROP_MODEL,
        useFactory: (connection: Connection) => connection.model('Crop', CropSchema),
        inject: [DATABASE_CONNECTION],
    },
];

export const irrigationProviders = [
    {
        provide: IRRIGATION_MODEL,
        useFactory: (connection: Connection) => connection.model('Irrigation', IrrigationSchema),
        inject: [DATABASE_CONNECTION],
    },
];

export const fertilizerPesticideProvider = [
    {
        provide: FERTILIZER_PESTICIDE_MODEL,
        useFactory: (connection: Connection) => connection.model('FertiliserPesticide', FertiliserPesticideSchema),
        inject: [DATABASE_CONNECTION]
    },
];

export const financialProvider = [
    {
        provide: FINANCIAL_MODE,
        useFactory: (connection: Connection) => connection.model('CropFinancial', FinancialSchema),
        inject: [DATABASE_CONNECTION]
    },
];

export const cropActivityProvider = [
    {
        provide: ACTIVITY_MODEL,
        useFactory: (connection: Connection) => connection.model('CropActivity', activitySchema),
        inject: [DATABASE_CONNECTION],
    },
];

export const pestdieaseIssueProvider = [{
    provide: PEST_DISEASE_MODEL,
    useFactory: (connection: Connection) => connection.model('PestDiseaseIssue', pestDiseaseIssueSchema),
    inject: [DATABASE_CONNECTION],
}]

