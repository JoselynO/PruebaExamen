import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateLuchadoreDto } from './dto/create-luchadore.dto';
import { UpdateLuchadoreDto } from './dto/update-luchadore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Luchadore } from './entities/luchadore.entity';
import { Repository } from 'typeorm';
import { Raza } from '../razas/entities/raza.entity';
import { LuchadoresMapper } from './mappers/luchadores.mappers';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LuchadoresService {
  private readonly logger: Logger = new Logger(LuchadoresService.name);

  constructor(
    @InjectRepository(Luchadore)
    private readonly luchadoreRepository: Repository<Luchadore>,
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>,
    private readonly luchadoreMapper: LuchadoresMapper,
  ) {}
  async create(createLuchadoreDto: CreateLuchadoreDto) {
    this.logger.log(`Crear luchador ${JSON.stringify(createLuchadoreDto)}`);
    const raza = await this.checkRaza(createLuchadoreDto.raza);
    const luchadoreToCreate = this.luchadoreMapper.toEntity(
      createLuchadoreDto,
      raza,
    );
    const luchadoreCreated = await this.luchadoreRepository.save({
      ...luchadoreToCreate,
      id: uuidv4(),
    });
    return this.luchadoreMapper.toResponseDto(luchadoreCreated);
  }

  async findAll() {
    this.logger.log('Encuentra todos los luchadores');
    const luchadores = await this.luchadoreRepository
      .createQueryBuilder('luchadore')
      .leftJoinAndSelect('luchadore.raza', 'raza')
      .orderBy('luchadore.id', 'ASC')
      .getMany();
    return luchadores.map((luchadore) =>
      this.luchadoreMapper.toResponseDto(luchadore),
    );
  }

  async findOne(id: string) {
    this.logger.log(`Encuentra un luchador por id:${id}`);
    const luchadorToFind = await this.luchadoreRepository
      .createQueryBuilder('luchadore')
      .leftJoinAndSelect('luchadore.raza', 'raza')
      .where('luchadore.id = :id', { id })
      .getOne();
    if (!luchadorToFind) {
      throw new NotFoundException(`Luchador con id ${id} no encontrado`);
    }
    return this.luchadoreMapper.toResponseDto(luchadorToFind);
  }

  async update(id: string, updateLuchadoreDto: UpdateLuchadoreDto) {
    this.logger.log(
      `Actualizar luchador por id:${id} - ${JSON.stringify(updateLuchadoreDto)}`,
    );
    const luchadorToUpdate = await this.exists(id);
    let raza: Raza;
    if (updateLuchadoreDto.raza) {
      raza = await this.checkRaza(updateLuchadoreDto.raza);
    }
    const luchadorUpdated = await this.luchadoreRepository.save({
      ...luchadorToUpdate,
      ...updateLuchadoreDto,
      raza: raza ? raza : luchadorToUpdate.raza,
    });
    return this.luchadoreMapper.toResponseDto(luchadorUpdated);
  }

  async remove(id: string) {
    this.logger.log(`Eliminar luchador por id:${id}`);
    const luchadorToRemove = await this.exists(id);
    luchadorToRemove.isDeleted = true;
    return this.luchadoreMapper.toResponseDto(
      await this.luchadoreRepository.save(luchadorToRemove),
    );
  }

  async removeSoft(id: string) {
    this.logger.log(`Eliminando luchador con el id:${id}`);
    const luchadorToRemove = await this.exists(id);
    luchadorToRemove.isDeleted = true;
    return this.luchadoreMapper.toResponseDto(
      await this.luchadoreRepository.save(luchadorToRemove),
    );
  }

  public async exists(id: string): Promise<Luchadore> {
    const luchador = await this.luchadoreRepository.findOneBy({ id });
    if (!luchador) {
      this.logger.log(`Luchador con id ${id} no encontrado`);
      throw new NotFoundException(`Luchador con id ${id} no encontrado`);
    }
    return luchador;
  }

  public async checkRaza(nombreRaza: string): Promise<Raza> {
    const raza = await this.razaRepository
      .createQueryBuilder()
      .where('LOWER(nombre) = LOWER(:nombre)', {
        nombre: nombreRaza.toLowerCase(),
      })
      .getOne();

    if (!raza) {
      this.logger.log(`Raza ${nombreRaza} no existe`);
      throw new BadRequestException(`Raza ${nombreRaza} no existe`);
    }

    return raza;
  }
}
