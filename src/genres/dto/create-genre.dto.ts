import { IsAlpha, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateGenreDto {
  @IsAlpha()
  @IsNotEmpty()
  @MaxLength(32)
  name: string;
}
