import * as mongoose from 'mongoose';

export const BackgroundImageSchema = new mongoose.Schema({
    base64String: { type: String, required: true }
});

export interface IBackgroundImage {

    id: string;

    base64String: string;
    
}