import { ValidationPipe, HttpStatus, VersioningType } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = new ConfigService();

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      // transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      // whitelist: true, 
    }),
  );

  app.enableCors({
    origin: configService.getOrThrow<string>("SERVER_URL"),
    methods: configService.getOrThrow<string>("CORS_METHODS"),
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });



  app.enableVersioning({ type: VersioningType.URI });

  const serverPORT: number = configService.get<number>('SERVER_PORT', 3030);

  await app.listen(serverPORT, () => {
    console.log('Server is running on port', serverPORT);
  });
}

bootstrap();
