/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ITodo } from './ITodo';
import { TodoDTO } from './TodoDTO';
import { TodosService } from './todos.service';

@Controller('todos')
@ApiSecurity('apiKey')
@ApiSecurity('tokenAuth')
@ApiTags('Todos')
export class TodosController {
    
    constructor(private readonly _todosService: TodosService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    public async getTodos(@Request() poReq): Promise<ITodo[]>{
        return await this._todosService.getTodos(poReq.user.id);
    }

    @Post('newTodo')
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: "Todo registration" })
    @ApiBody({type: TodoDTO})
    public async addTodo(@Request() poReq, @Body("title")psTitle: string, @Body("description") psDescription: string, @Body("closed") pbClosed: boolean, @Body("date") psDate: string): Promise<string> {
        return await this._todosService.createTodo(psTitle, psDescription, pbClosed, psDate, poReq.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({name: "id", type: String, description: "Id of the todo."})
    public async getTodo(@Request() poReq, @Param("id") psId: string): Promise<ITodo>{
        return await this._todosService.getTodo(psId, poReq.user.id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiParam({name: "id", type: String, description: "Id of the todo."})
    public async deleteTodo(@Param("id") psId: string): Promise<boolean>{
        return await this._todosService.deleteTodo(psId);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBody({type: TodoDTO})
    public async updateTodo(@Param("id") psId: string, @Body("title")psTitle: string, @Body("description") psDescription: string, @Body("closed") pbClosed: boolean, @Body("date") psDate: string) {
        return await this._todosService.updateTodo(psId, psTitle, psDescription, pbClosed, psDate);
    }
}
