// src/movie/movie.module.ts
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [MovieController],
  providers: [MovieService, PrismaService],
})
export class MovieModule {}
