import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('auth');
  const options = new DocumentBuilder()
    .setTitle('Auth MicroService')
    .setDescription('Auth MicroService Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3003).then(() => {
    console.log('Auth Service is running on port:3003');
  });
}
bootstrap();
