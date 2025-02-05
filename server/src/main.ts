import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Movie Booker')
    .setDescription('The Movie Booker API description')
    .setVersion('1.0')
    .addTag('movies and bookings')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
    })
    // .addSecurityRequirements('ApiKeyAuth')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 8000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
