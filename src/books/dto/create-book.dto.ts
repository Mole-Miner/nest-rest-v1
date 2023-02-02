import {
  ArrayNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';

import { Author } from '../../authors/entities/author.entity';
import { CreateAuthorDto } from '../../authors/dto/create-author.dto';

export class CreateBookDto {
  @Matches(/^[a-zA-Z0-9\s]+$/)
  @Transform(({ value }: TransformFnParams) => value.trim?.())
  @MaxLength(32)
  title: string;

  @IsString()
  @Transform(({ value }: TransformFnParams) => value.trim?.())
  @MaxLength(256)
  overview: string;

  @IsNumber()
  pages: number;

  @ValidateNested()
  @Type(() => CreateAuthorDto)
  author: Author;

  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  genreIds: number[];
}
