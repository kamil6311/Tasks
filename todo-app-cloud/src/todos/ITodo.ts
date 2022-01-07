import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    closed: { type: Boolean, required: true },
    date: { type: String, required: true },
});

export interface ITodo {
    _id: string;
    
    title: string;

    description: string;

    closed: boolean;

    date: string;
}