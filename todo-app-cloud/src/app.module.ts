import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BackgroundModule } from './background/background.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, BackgroundModule, AuthModule, HttpModule, MongooseModule.forRoot('mongodb+srv://admin:KamsAdmin@cluster0.k4oap.mongodb.net/todoDb?retryWrites=true&w=majority'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("");
  }
    
}
