import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  mongoose.set("debug", true);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
