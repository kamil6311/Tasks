/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { ITodo } from './ITodo';
import { TodoDTO } from './TodoDTO';
import { TodosService } from './todos.service';

@Controller('todos')
@ApiSecurity('apiKey')
export class TodosController {
    
    constructor(private readonly _todosService: TodosService) {}

    @Get()
    public async getTodos(): Promise<ITodo[]>{
        return await this._todosService.getTodos();
    }

    @Post('newTodo')
    @ApiCreatedResponse({ description: "Todo registration" })
    @ApiBody({type: TodoDTO})
    public async addTodos(@Body("title")psTitle: string, @Body("description") psDescription: string, @Body("closed") pbClosed: boolean, @Body("date") psDate: string): Promise<string> {
        return await this._todosService.createTodo(psTitle, psDescription, pbClosed, psDate);
    }
   
    @Get(':id')
    @ApiParam({name: "id", type: String, description: "Id of the todo."})
    public async getTodo(@Param("id") psId: string): Promise<ITodo>{
        return await this._todosService.getTodo(psId);
    }

    @Delete(':id')
    @ApiParam({name: "id", type: String, description: "Id of the todo."})
    public async deleteTodo(@Param("id") psId: string): Promise<boolean>{
        return await this._todosService.deleteTodo(psId);
    }

    @Patch(':id')
    @ApiBody({type: TodoDTO})
    public async updateTodo(@Param("id") psId: string, @Body("title")psTitle: string, @Body("description") psDescription: string, @Body("closed") pbClosed: boolean, @Body("date") psDate: string) {
        return await this._todosService.updateTodo(psId, psTitle, psDescription, pbClosed, psDate);
    }
}
