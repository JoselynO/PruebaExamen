import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { Raza } from './entities/raza.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RazaMappers } from './mappers/raza.mapper';

@Injectable()
export class RazasService {
  private readonly logger = new Logger(RazasService.name);

  constructor(
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>,
    private readonly razasMapper: RazaMappers,
  ) {}

  async create(createRazaDto: CreateRazaDto) {
    this.logger.log(`Creando Raza ${createRazaDto}`);
    const razaToCreate = this.razasMapper.toEntity(createRazaDto);
    return await this.razaRepository.save(razaToCreate);
  }

  async findAll() {
    this.logger.log('Encontrar todas las categorias');
    return await this.razaRepository.find();
  }

  async findOne(id: number) {
    this.logger.log(`Encuentra una raza por id: ${id}`);
    const razaToFound = await this.razaRepository.findOneBy({ id });
    if (!razaToFound) {
      this.logger.log(`Raza con id:${id} no encontrada`);
      throw new NotFoundException(`Raza con el id ${id} no encontrada`);
    }
    return razaToFound;
  }

  async update(id: number, updateRazaDto: UpdateRazaDto) {
    this.logger.log(`Actualizando raza con id: ${id} - ${updateRazaDto}`);
    const razaToUpdated = await this.findOne(id);
    return await this.razaRepository.save({
      ...razaToUpdated,
      ...updateRazaDto,
    });
  }

  async remove(id: number) {
    this.logger.log(`Eliminando raza con id:${id}`);
    const razaToRemove = await this.findOne(id);
    return await this.razaRepository.remove(razaToRemove);
  }

  async removeSoft(id: number) {
    this.logger.log(`Elimando raza soft con id: ${id}`);
    const razaToRemove = await this.findOne(id);
    return await this.razaRepository.save({
      ...razaToRemove,
      updatedAt: new Date(),
      isDeleted: true,
    });
  }
}
