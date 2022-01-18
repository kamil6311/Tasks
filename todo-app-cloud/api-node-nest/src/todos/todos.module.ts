import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { TodoSchema } from './ITodo';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]), UsersModule],
  providers: [TodosService],
})
export class TodosModule {}
