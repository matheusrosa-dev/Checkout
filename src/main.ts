import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  const port = config.get<number>('api.port');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port!);
}
bootstrap();
