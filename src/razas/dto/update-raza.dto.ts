import { PartialType } from '@nestjs/mapped-types';
import { CreateRazaDto } from './create-raza.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateRazaDto extends PartialType(CreateRazaDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100, {
    message: 'El nombre de la raza debe tener entre 1 y 100 caracteres',
  })
  @Transform((nombre) => nombre.value.trim())
  nombre?: string;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}
