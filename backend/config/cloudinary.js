import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dfkdmwudp",
    api_key: process.env.CLOUDINARY_API_KEY || "836542476984981",
    api_secret: process.env.CLOUDINARY_API_SECRET || "BwawVAY6zB5KgQPK-jT7H8WLuQU"
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'expenses-receipts',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

export const upload = multer({ storage: storage });
