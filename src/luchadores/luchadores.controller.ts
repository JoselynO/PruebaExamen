import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { LuchadoresService } from './luchadores.service';
import { CreateLuchadoreDto } from './dto/create-luchadore.dto';
import { UpdateLuchadoreDto } from './dto/update-luchadore.dto';

@Controller('luchadores')
export class LuchadoresController {
  private readonly logger: Logger = new Logger(LuchadoresController.name);
  constructor(private readonly luchadoresService: LuchadoresService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createLuchadoreDto: CreateLuchadoreDto) {
    this.logger.log(`Crear luchador ${createLuchadoreDto}`);
    return await this.luchadoresService.create(createLuchadoreDto);
  }

  @Get()
  async findAll() {
    this.logger.log(`Encontrar todos los luchadores`);
    return await this.luchadoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Encuentra un luchador con id: ${id}`);
    return await this.luchadoresService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLuchadoreDto: UpdateLuchadoreDto,
  ) {
    this.logger.log(
      `Actualizando luchador con id: ${id} - ${updateLuchadoreDto}`,
    );
    return await this.luchadoresService.update(id, updateLuchadoreDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    this.logger.log(`Eliminando luchador con el id: ${id}`);
    return await this.luchadoresService.removeSoft(id);
  }
}
