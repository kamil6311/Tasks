import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBackgroundImage } from './IBackgroundImage';

@Injectable()
export class BackgroundService {
    private static readonly C_BG_IMAGE_ID = "61d9d6af1730585d49bf403d";
    
    constructor(@InjectModel('BackgroundImage') private readonly _imageModel: Model<IBackgroundImage>){}

    public async saveBackgroundImage(psBase64Image: string): Promise<string> {
        const bgImage = await this.getImageBackground();

        let updatedBg = await this._imageModel.findById(bgImage.id).exec();

        if(!updatedBg){
            throw new NotFoundException("Could not find background image");
        }
        updatedBg.base64String = psBase64Image;
        const result = await updatedBg.save();

        return result.id as string;
    }

    public async getImageBackground(): Promise<IBackgroundImage> {
        const bgImages = await this._imageModel.find().exec();

        return bgImages.map((result) => ({id: result.id, base64String: result.base64String}))[0];
    }
}
