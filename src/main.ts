import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { BodyParserInterceptor } from './infra/interceptors/body-parse.interceptor';
import { LoggerInterceptor } from './infra/interceptors/logger.interceptor';

async function bootstrap() {
  // Start app with Fastify
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: JSON.parse(process.env?.LOGGERS || '["warn","error"]'),
    bodyParser: false,
  });

  // Enable Versioning
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1.0' }).setGlobalPrefix('api');

  // Enable Validations with Class Validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Use logger global interceptor to get request body
  app.useGlobalInterceptors(new BodyParserInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor());

  // if (process.env.NODE_ENV !== 'production') {
  // Config Swagger docs
  const config = new DocumentBuilder()
    .setTitle('API Exemplo')
    .setContact('Contato', 'http://localhost:5000/', 'test@email.com')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:${process.env.PORT || 5000}`)
    .addTag('Auth', 'Ações relacionadas à Autenticação de usuário')
    .addTag('Users', 'Ações relacionadas aos Usuários')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger/:version', app, document);

  // CORS config
  app.enableCors({
    origin: '*',
  });
  // }

  await app.listen(process.env.PORT || 5000, '0.0.0.0');
}
bootstrap();
