import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  
   app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    // allowedHeaders: 'Content-Type, Accept',
  });

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('FarmersTool API Documentation')
    .setDescription('This is an API Documentation of our FarmersTool application server side APIs')
    .setVersion('1.0')
    .addTag('farmerztool')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(port);
}
bootstrap();
