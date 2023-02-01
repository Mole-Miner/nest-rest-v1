import { Matches, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateGenreDto {
  @Matches(/^[a-zA-Z\s]+$/)
  @Transform(({ value }: TransformFnParams) => value.trim?.())
  @MaxLength(32)
  name: string;
}
