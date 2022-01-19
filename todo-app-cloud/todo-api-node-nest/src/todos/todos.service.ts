/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { ITodo } from './ITodo';
import { TodoDTO } from './TodoDTO';

@Injectable()
export class TodosService implements OnModuleInit {

    constructor(@InjectModel('Todo') private readonly _todoModel: Model<ITodo>, private _userService: UsersService){
    }
    
    public async onModuleInit() {
        await this.deleteUnusedTodos();
        await this.deleteClosedTodos();
    }

    public async createTodo(psTitle: string, psDescription: string, pbClosed: boolean, psDate: string, psUserId: string): Promise<string>{
        const newTodo = new this._todoModel({title: psTitle, description: psDescription, closed: pbClosed, date: psDate, userId: psUserId});
        const result = await newTodo.save();
        
        return result.id as string;
    }   

    public async getTodos(psUserId: string): Promise<TodoDTO[]>{
        const todos = await this._todoModel.find({userId: psUserId}).exec();

        return todos.map((resultTodo) => (
            {id: resultTodo.id, title: resultTodo.title, description: resultTodo.description, closed: resultTodo.closed, date: resultTodo.date}
        ));
    }

    public async getTodo(psId: string): Promise<TodoDTO> {
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

    @Cron(CronExpression.EVERY_DAY_AT_4AM)
    private async deleteUnusedTodos(){
        console.log("Checking for unused todos...");
        
        const todos: ITodo[] = await this._todoModel.find().exec();

        todos.forEach(async (todo: ITodo) => {
            const isUserIdExists: boolean = await this._userService.findeUserById(todo.userId);

            if(!isUserIdExists){
                console.log("deleting " + todo._id);
                await this.deleteTodo(todo._id);
            }
        });
    }

    @Cron(CronExpression.EVERY_WEEKEND)
    private async deleteClosedTodos(){
        console.log("Checking for closed todos...");
        
        const todos: ITodo[] = await this._todoModel.find({closed: true}).exec();

        todos.forEach(async (todo: ITodo) => {
            console.log("deleting " + todo._id);
            await this.deleteTodo(todo._id);
        });
    }
}
