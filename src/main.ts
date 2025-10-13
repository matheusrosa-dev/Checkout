import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.use(cookieParser.default());

  const config = app.get<ConfigService>(ConfigService);

  const port = config.get<number>('api.port');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port!);
}
bootstrap();
