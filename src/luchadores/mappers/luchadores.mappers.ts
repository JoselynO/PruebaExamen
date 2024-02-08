import { Injectable } from '@nestjs/common';
import { CreateLuchadoreDto } from '../dto/create-luchadore.dto';
import { Raza } from '../../razas/entities/raza.entity';
import { Luchadore } from '../entities/luchadore.entity';
import { plainToClass } from 'class-transformer';
import { ResponseLuchadoreDto } from '../dto/response-luchadore.dto';

@Injectable()
export class LuchadoresMapper {
  toEntity(createLuchadoreDto: CreateLuchadoreDto, raza: Raza): Luchadore {
    const luchador = plainToClass(Luchadore, createLuchadoreDto);
    luchador.raza = raza;
    return luchador;
  }

  toResponseDto(luchadores: Luchadore): ResponseLuchadoreDto {
    const dto = plainToClass(ResponseLuchadoreDto, luchadores);
    if (luchadores.raza) {
      dto.raza = luchadores.raza.nombre;
    } else {
      dto.raza = null;
    }
    return dto;
  }
}
