import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, HttpModule, MongooseModule.forRoot('mongodb+srv://admin:KamsAdmin@cluster0.k4oap.mongodb.net/todoDb?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService, HttpModule],
})
export class AppModule {}
