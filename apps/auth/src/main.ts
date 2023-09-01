import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true)); // ack = true, We don't want to akwoledge messages because we are using Request-Response base pattern instead of events

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);

  app.startAllMicroservices(); // Listener sur amqp
  app.listen(configService.get('PORT')); // Listener sur Http, auth est un microservice hybride qui peut écouter sur http et sur amqp
}
bootstrap();
