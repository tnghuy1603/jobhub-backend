import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
@Injectable()
export class CloudinaryService {
    constructor(){
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        });
    }
    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse>{
        try {
        console.log(`File path ${file.destination} and ${file.path}`);
        const res =  await cloudinary.uploader.upload(file.path, {folder: 'jobhub', resource_type: 'auto', })
        console.log(`Secured url ${res.secure_url}`);
        return res;
        
        } catch (error) {
            console.log(error);
        }
        
        
    }
    async deleteFile(publicId: string){
        const res =  await cloudinary.uploader.destroy(publicId);
        return res;
    }
    
}
