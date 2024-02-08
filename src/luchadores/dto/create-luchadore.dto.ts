import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Elemento } from '../entities/luchadore.entity';
import { Transform } from 'class-transformer';

export class CreateLuchadoreDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  @Transform((value) => value.value.trim())
  nombre: string;

  @IsString({ message: 'La imagen solo puede ser String' })
  @IsNotEmpty({ message: 'La imagen no puede estar vacia' })
  @Transform((avatar) => avatar.value.trim())
  @IsOptional()
  avatar?: string;

  @IsNumber()
  @Min(0, { message: 'El poder debe ser mayor que 0' })
  @Max(100, { message: 'El poder debe estar en un rango entre 0 y 100' })
  poder: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 100, {
    message: 'El ataque final debe tener entre 3 y 100 caracteres',
  })
  ataqueFinal: string;

  @IsString()
  @IsNotEmpty()
  raza: string;

  @IsEnum(Elemento, {
    message:
      'El elemento solo puede ser: ANDROIDES,TERRICOLAS, FREEZA, NAMEKIANOS, SAIYANS ',
  })
  @IsNotEmpty({ message: 'El elemento no puede estar vacio' })
  @Transform((value) => value.value.toUpperCase())
  tipoElemento: Elemento;
}
