import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'KMA News API Docs',
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSerice = app.get(ConfigService);
  const port = configSerice.get<number>('PORT');
  const config = new DocumentBuilder()
    .setTitle('KMA News API')
    .setDescription('API for KMA News')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication')
    .addTag('user', 'Operations about user')
    .addTag('category', 'Operation about category')
    .addTag('option', 'Option of website')
    .addTag('publisher', 'Source publisher')
    .addTag('post')
    .addTag('channel', 'Channel of user or system')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, customOptions);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  });
  Logger.log(`🚀 App listening in ${port}`);
  await app.listen(port || 3000);
}
bootstrap();
