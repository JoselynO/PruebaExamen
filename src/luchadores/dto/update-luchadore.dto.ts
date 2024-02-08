import { PartialType } from '@nestjs/mapped-types';
import { CreateLuchadoreDto } from './create-luchadore.dto';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Elemento } from '../entities/luchadore.entity';

export class UpdateLuchadoreDto extends PartialType(CreateLuchadoreDto) {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  poder?: number;

  @IsString()
  @IsOptional()
  ataqueFinal?: string;

  @IsString()
  @IsOptional()
  raza?: string;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @IsEnum(Elemento, {
    message:
      'El elemento solo puede ser: ANDROIDES, TERRICOLAS, FREEZA, NAMEKIANOS, SAIYANS',
  })
  tipoElemento?: Elemento;
}
