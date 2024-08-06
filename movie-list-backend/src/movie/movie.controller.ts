// src/movie/movie.controller.ts
import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  Get,
  Query,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
@UseGuards(JwtAuthGuard)
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('')
  async getMovies(
    @Request() req,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const userId = req.user.userId;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    if (pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException('Page and limit must be positive numbers');
    }
    return this.movieService.getMovies(userId, pageNumber, limitNumber);
  }

  @Get('/count')
  async getTotalMovieCount(@Request() req) {
    const userId = req.user.userId;
    return this.movieService.getTotalMovieCount(userId);
  }

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async addMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.movieService.createMovie(
      createMovieDto.title,
      parseInt(createMovieDto.publishingYear as unknown as string, 10), //
      file,
      req.user.userId,
    );
  }

  @Post('/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateMovie(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateMovieDto: UpdateMovieDto,
    @Request() req,
  ) {
    return this.movieService.updateMovie(
      +id,
      updateMovieDto.title,
      parseInt(updateMovieDto.publishingYear as unknown as string, 10), //
      file,
      req.user.userId,
    );
  }

  @Delete('remove/:id')
  async removeMovie(@Param('id') id: string, @Request() req) {
    await this.movieService.deleteMovie(+id, req.user.userId);
  }

  @Get('/:id/authorized')
  async isAuthorizedToEditMovie(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return {
      authorized: await this.movieService.isAuthorizedToEdit(+id, userId),
    };
  }
}

// import {
//   Controller,
//   Post,
//   Delete,
//   Body,
//   Param,
//   Request,
//   UseGuards,
//   Get,
//   Query,
//   BadRequestException,
// } from '@nestjs/common';
// import { MovieService } from './movie.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { CreateMovieDto } from './dto/create-movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';

// @Controller('movie')
// @UseGuards(JwtAuthGuard)
// export class MovieController {
//   constructor(private movieService: MovieService) {}

//   @Get('')
//   async getMovies(
//     @Request() req,
//     @Query('page') page: string,
//     @Query('limit') limit: string,
//   ) {
//     const userId = req.user.userId;
//     const pageNumber = parseInt(page) || 1;
//     const limitNumber = parseInt(limit) || 10;
//     if (pageNumber < 1 || limitNumber < 1) {
//       throw new BadRequestException('Page and limit must be positive numbers');
//     }
//     return this.movieService.getMovies(userId, pageNumber, limitNumber);
//   }

//   @Get('/count')
//   async getTotalMovieCount(@Request() req) {
//     const userId = req.user.userId;
//     return this.movieService.getTotalMovieCount(userId);
//   }
//   @Post('')
//   async addMovie(@Body() createMovieDto: CreateMovieDto, @Request() req) {
//     return this.movieService.createMovie(
//       createMovieDto.title,
//       createMovieDto.publishingYear,
//       createMovieDto.poster,
//       req.user.userId,
//     );
//   }

//   @Post('/:id')
//   async updateMovie(
//     @Param('id') id: string,
//     @Body() updateMovieDto: UpdateMovieDto,
//     @Request() req,
//   ) {
//     return this.movieService.updateMovie(
//       +id,
//       updateMovieDto.title,
//       updateMovieDto.publishingYear,
//       updateMovieDto.poster,
//       req.user.userId,
//     );
//   }

//   @Delete('remove/:id')
//   async removeMovie(@Param('id') id: string, @Request() req) {
//     await this.movieService.deleteMovie(+id, req.user.userId);
//   }
// }
