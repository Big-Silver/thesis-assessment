import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = process.env.PORT;
  await app.listen(port);
}

bootstrap();
