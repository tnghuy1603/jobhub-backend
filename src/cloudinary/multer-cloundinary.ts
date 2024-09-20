import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from 'cloudinary'
import * as multer from "multer";
import { extname } from "path";
export const cloudStorage = new CloudinaryStorage({
    cloudinary
})

    
export const diskStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    cb(null, `${name}-${randomName}${extension}`);
    },
});


