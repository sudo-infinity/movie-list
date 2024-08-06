import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to include cookies in requests
  });

  await app.listen(process.env.PORT, () => {
    console.log(`Application is running on: ${process.env.PORT}`);
  });
}
bootstrap();
