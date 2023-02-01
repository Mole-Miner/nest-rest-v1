import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  summary: string;

  @IsNumber()
  pages: number;

  @IsNumber()
  authorId: number;

  @IsNumber({}, { each: true })
  genreIds: number[];
}
