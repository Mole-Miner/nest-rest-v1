import { IsAlpha, IsDateString, IsNumber, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsAlpha()
  @MaxLength(32)
  firstname: string;

  @IsAlpha()
  @MaxLength(32)
  lastname: string;

  @IsNumber()
  age: number;

  @IsDateString()
  @MaxLength(24)
  born: string;

  @IsAlpha()
  @MaxLength(32)
  nationality: string;
}
