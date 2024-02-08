import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { RazasService } from './razas.service';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';

@Controller('razas')
export class RazasController {
  private readonly logger = new Logger(RazasController.name);
  constructor(private readonly razasService: RazasService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createRazaDto: CreateRazaDto) {
    this.logger.log(`Creando raza ${JSON.stringify(createRazaDto)}`);
    return await this.razasService.create(createRazaDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Encontrara todas las razas');
    return await this.razasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    this.logger.log(`Encontrar raza con id:${id}`);
    return await this.razasService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRazaDto: UpdateRazaDto,
  ) {
    this.logger.log(
      `Actualizando raza con id:${id} - ${JSON.stringify(updateRazaDto)}`,
    );
    return await this.razasService.update(id, updateRazaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    this.logger.log(`Eliminando raza con id:${id}`);
    await this.razasService.removeSoft(id);
  }
}
