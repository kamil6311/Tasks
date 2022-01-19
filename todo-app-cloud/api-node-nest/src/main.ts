import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

  async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    // var whitelist = ['https://localhost:3001'];
    // app.enableCors({
    //   origin: function (origin, callback) {
    //     if (!origin || whitelist.indexOf(origin) !== -1) {
    //       callback(null, true)
    //     } else {
    //       callback(new Error('Not allowed by CORS'))
    //     }
    //   },
    // });

    app.useGlobalPipes(new ValidationPipe({
      transform: true
    }));
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    
    const options = new DocumentBuilder().setTitle('Todo App API').setVersion("1.0.0").addApiKey({type: 'apiKey', name: 'apiKey', in: 'header'}, 'apiKey').addBearerAuth({ type: 'http', name: 'tokenAuth', in: 'header'}, 'tokenAuth').build();
    const swaggerDocument = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, swaggerDocument);
    app.enableCors();

    await app.listen(process.env.PORT || 3000);
    

  };
bootstrap();
