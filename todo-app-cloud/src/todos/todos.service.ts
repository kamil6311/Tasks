/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from './ITodo';

@Injectable()
export class TodosService {

    constructor(@InjectModel('Todo') private readonly _todoModel: Model<ITodo>){}

    public async createTodo(psTitle: string, psDescription: string, pbClosed: boolean, psDate: string): Promise<string>{
        const todoId = Math.random().toString();
        const newTodo = new this._todoModel({title: psTitle, description: psDescription, closed: pbClosed, date: psDate});
        const result = await newTodo.save();
        
        return result.id as string;
    }   

    public async getTodos(): Promise<ITodo[]>{
        const todos = await this._todoModel.find().exec();

        return todos.map((resultTodo) => (
            {id: resultTodo.id, title: resultTodo.title, description: resultTodo.description, closed: resultTodo.closed, date: resultTodo.date}
        ));
    }

    public async getTodo(psId: string): Promise<ITodo> {
        const todo = await this._todoModel.findById(psId);
        if(!todo){
            throw new NotFoundException("Could not find this todo");
        }
        return {id: todo.id, title: todo.title, description: todo.description, closed: todo.closed, date: todo.date};
    }

    public async deleteTodo(psId: string): Promise<boolean> {
        const deleteResult = await this._todoModel.deleteOne({_id: psId}).exec();
        if(deleteResult.deletedCount === 0) {
            throw new NotFoundException("Could not find this todo");
        }
        return deleteResult.acknowledged;
    }
    
    public async updateTodo(psId: string, psTitle: string, psDescription: string, pbClosed: boolean, psDate: string){
        let updatedTodo = await this._todoModel.findById(psId).exec();

        if(!updatedTodo){
            throw new NotFoundException("Could not find this todo");
        }

        updatedTodo.title = psTitle? psTitle : updatedTodo.title;
        updatedTodo.description = psDescription? psDescription : updatedTodo.description;
        updatedTodo.closed = pbClosed? pbClosed : updatedTodo.closed;
        updatedTodo.date = psDate? psDate : updatedTodo.date;
        
        await updatedTodo.save();
    }
}
