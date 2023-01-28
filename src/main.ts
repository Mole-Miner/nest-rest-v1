import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true, // prevent sqli and xss in class-validator@0.13.2
      disableErrorMessages: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
