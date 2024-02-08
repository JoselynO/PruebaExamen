import { Injectable } from '@nestjs/common';
import { CreateRazaDto } from '../dto/create-raza.dto';
import { UpdateRazaDto } from '../dto/update-raza.dto';
import { Raza } from '../entities/raza.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RazaMappers {
  toEntity(createRazaDto: CreateRazaDto | UpdateRazaDto): Raza {
    return plainToClass(Raza, createRazaDto);
  }
}
