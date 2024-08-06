// src/movie/movie.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from '@prisma/client';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async getMovies(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Movie[]> {
    const skip = (page - 1) * limit;
    return this.prisma.movie.findMany({
      where: { userId },
      skip,
      take: limit,
    });
  }

  async getTotalMovieCount(userId: number): Promise<number> {
    return this.prisma.movie.count({
      where: { userId },
    });
  }

  async createMovie(
    title: string,
    publishingYear: number,
    file: Express.Multer.File,
    userId: number,
  ): Promise<Movie> {
    const posterUrl = await this.cloudinary.uploadImage(file); // Upload to Cloudinary
    return this.prisma.movie.create({
      data: {
        title,
        publishingYear,
        poster: posterUrl, // Store Cloudinary URL in the database
        userId,
      },
    });
  }

  async deleteMovie(id: number, userId: number): Promise<void> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (movie && movie.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this movie',
      );
    }

    await this.prisma.movie.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  // async updateMovie(
  //   id: number,
  //   title: string,
  //   publishingYear: number,
  //   file: Express.Multer.File,
  //   userId: number,
  // ): Promise<Movie> {
  //   const movie = await this.prisma.movie.findUnique({
  //     where: { id },
  //   });

  //   if (!movie || movie.userId !== userId) {
  //     throw new UnauthorizedException(
  //       'You are not authorized to edit this movie',
  //     );
  //   }
  //   const posterUrl = await this.cloudinary.uploadImage(file); // Upload to Cloudinary

  //   return this.prisma.movie.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       title,
  //       publishingYear,
  //       poster: posterUrl, // Store Cloudinary URL in the database
  //     },
  //   });
  // }
  async updateMovie(
    id: number,
    title: string,
    publishingYear: number,
    file: Express.Multer.File | undefined,
    userId: number,
  ): Promise<Movie> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie || movie.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to edit this movie',
      );
    }

    let posterUrl = movie.poster;
    if (file) {
      posterUrl = await this.cloudinary.uploadImage(file); // Upload new image and get URL
    }

    return this.prisma.movie.update({
      where: { id },
      data: {
        title,
        publishingYear,
        poster: posterUrl, // Update with new or existing URL
      },
    });
  }

  async isAuthorizedToEdit(movieId: number, userId: number): Promise<boolean> {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new UnauthorizedException('Movie not found');
    }

    return movie.userId === userId;
  }
}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { Movie } from '@prisma/client';

// @Injectable()
// export class MovieService {
//   constructor(private prisma: PrismaService) {}

//   async getMovies(
//     userId: number,
//     page: number,
//     limit: number,
//   ): Promise<Movie[]> {
//     const skip = (page - 1) * limit;
//     return this.prisma.movie.findMany({
//       where: { userId }, // Filter movies by userId
//       skip,
//       take: limit,
//     });
//   }

//   async getTotalMovieCount(userId: number): Promise<number> {
//     // get total movie count for a user
//     return this.prisma.movie.count({
//       where: { userId },
//     });
//   }

//   async createMovie(
//     title: string,
//     publishingYear: number,
//     poster: string,
//     userId: number,
//   ): Promise<Movie> {
//     return this.prisma.movie.create({
//       data: {
//         title,
//         publishingYear,
//         poster,
//         userId,
//       },
//     });
//   }

//   async deleteMovie(id: number, userId: number): Promise<void> {
//     const movie = await this.prisma.movie.findUnique({
//       where: { id },
//     });

//     if (movie && movie.userId !== userId) {
//       throw new UnauthorizedException(
//         'You are not authorized to delete this movie',
//       );
//     }

//     await this.prisma.movie.deleteMany({
//       where: {
//         id,
//         userId,
//       },
//     });
//   }

//   async updateMovie(
//     id: number,
//     title: string,
//     publishingYear: number,
//     poster: string,
//     userId: number,
//   ): Promise<Movie> {
//     const movie = await this.prisma.movie.findUnique({
//       where: { id },
//     });

//     if (!movie || movie.userId !== userId) {
//       throw new UnauthorizedException(
//         'You are not authorized to edit this movie',
//       );
//     }

//     return this.prisma.movie.update({
//       where: {
//         id,
//       },
//       data: {
//         title,
//         publishingYear,
//         poster,
//       },
//     });
//   }
// }
