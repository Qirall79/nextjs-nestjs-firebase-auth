import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
