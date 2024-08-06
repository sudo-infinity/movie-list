import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  publishingYear?: number;
}
