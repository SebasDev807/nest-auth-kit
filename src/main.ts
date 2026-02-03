import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger("Bootstrap");

  app.setGlobalPrefix("api/v1")
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  await app.listen(envs.PORT);
  logger.log(`Application is running on: http://localhost:${envs.PORT}`);
}
bootstrap();
