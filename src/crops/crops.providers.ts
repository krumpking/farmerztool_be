import { Connection } from "mongoose";
import { DATABASE_CONNECTION } from "src/common/constants";
import { CropSchema } from "./schema/crops.schema";
import { CROP_MODEL, IRRIGATION_MODEL, FERTILIZER_PESTICIDE_MODEL } from "./constants/crop.constants";




export const cropProviders = [
    {
        provide: CROP_MODEL,
        useFactory: (connection: Connection) => connection.model('Crop', CropSchema),
        inject: [DATABASE_CONNECTION],
    },
];