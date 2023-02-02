import {
  IsAlpha,
  IsDateString,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateAuthorDto {
  @IsAlpha()
  @MaxLength(32)
  firstname: string;

  @IsAlpha()
  @MaxLength(32)
  lastname: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsDateString()
  born?: string;

  @IsOptional()
  @IsAlpha()
  @MaxLength(32)
  nationality?: string;
}
