import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT')) || 3000;

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  await app.listen(port);
}
bootstrap();
