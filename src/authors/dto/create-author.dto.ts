import {
  IsAlpha,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreateAuthorDto {
  @IsAlpha()
  @IsNotEmpty()
  @MaxLength(32)
  firstName: string;

  @IsAlpha()
  @IsNotEmpty()
  @MaxLength(32)
  lastName: string;

  @IsNumber()
  age: number;

  @IsDateString()
  @IsNotEmpty()
  @MaxLength(24)
  birthday: string;

  @IsAlpha()
  @IsNotEmpty()
  @MaxLength(32)
  nationality: string;
}
