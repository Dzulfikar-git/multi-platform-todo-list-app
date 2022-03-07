import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { CastErrorExceptionFilter } from './filters/cast-error-exception.filter';
import { GeneralSuccessExceptionFilter } from './filters/general-success-exception.filter';
import { InternalServerErrorExceptionFilter } from './filters/internal-server-error-exception.filter';
import { MongoExceptionFilter } from './filters/mongo-validation-exception.filter';
import { NotFoundExceptionFilter } from './filters/not-found-exception.filter';
import { RouteNotFoundExceptionFilter } from './filters/route-not-found-exception.filter';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { UnprocessableEntityExceptionFilter } from './filters/unprocessable-entity.filter';
import { ValidationExceptionPipe } from './pipes/validation-exception.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DI in custom class validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  //global filters exception
  app.useGlobalFilters(new RouteNotFoundExceptionFilter());
  app.useGlobalFilters(new InternalServerErrorExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  // global failed validation exception
  app.useGlobalPipes(new ValidationExceptionPipe());

  await app.listen(3000);
  console.log(`Server is running on http://localhost:3000`)
}
bootstrap();
