import { HttpException } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptions = {
    storage: diskStorage({
       destination: (req, file, cb) => {
        const uploadDr = './uploads';

        if(!existsSync(uploadDr)){
            mkdirSync(uploadDr, {recursive: true})
        }

        cb(null, uploadDr);
       },
       filename: (req, file, cb) => {
        const name = file.originalname.split(',')[0];
        const extension = extname(file.originalname);
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        cb(null, `${name}-${randomName}${extension}`);
       }  
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf|docx)$/)){
            cb(null, true);
        }else{
            cb(new HttpException("Unsupported file", 401), false);
        }
    },
    limits: {
        files: 1,
        fileSize: 1024 * 1024 * 5
    },
};