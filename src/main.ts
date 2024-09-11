import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmExceptionFilter } from './helper/filter/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    // whitelist: true,
    transform: true
  }));
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  await app.listen(3000);

}
bootstrap();
