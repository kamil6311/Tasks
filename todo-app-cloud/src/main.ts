import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

  async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const options = new DocumentBuilder().setTitle('Todo App API').setVersion("1.0.0").addApiKey({type: 'apiKey', name: 'apiKey', in: 'header'}, 'apiKey').build();
    const swaggerDocument = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, swaggerDocument);

    await app.listen(process.env.PORT || 3000);
    app.useGlobalPipes(new ValidationPipe({
      transform: true
    }));

  };
bootstrap();
