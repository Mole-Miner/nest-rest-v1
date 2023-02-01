import { IsNumber, IsString, Matches, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateBookDto {
  @Matches(/^[a-zA-Z0-9\s]*$/)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(32)
  title: string;

  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MaxLength(256)
  summary: string;

  @IsNumber()
  pages: number;

  @IsNumber()
  authorId: number;

  @IsNumber({}, { each: true })
  genreIds: number[];
}
