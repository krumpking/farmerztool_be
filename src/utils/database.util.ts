import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";


@Injectable()
export class DatabaseUtility {
    async documentExists(model: Model<any>, condition: any): Promise<boolean>{
        return !!await model.findOne(condition);
    }
}