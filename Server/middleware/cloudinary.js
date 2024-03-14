import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET 
});

export const uploadOnCloudinary =  async (localFilePath) => {
    try {
        if(!localFilePath)
        {
            return "Coudn't find the path for file";
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:'auto'
        })
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary");
        console.log(response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the uploaded operation got failed
        return null;
    }
}