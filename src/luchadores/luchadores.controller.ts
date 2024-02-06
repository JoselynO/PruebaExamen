import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LuchadoresService } from './luchadores.service';
import { CreateLuchadoreDto } from './dto/create-luchadore.dto';
import { UpdateLuchadoreDto } from './dto/update-luchadore.dto';

@Controller('luchadores')
export class LuchadoresController {
  constructor(private readonly luchadoresService: LuchadoresService) {}

  @Post()
  create(@Body() createLuchadoreDto: CreateLuchadoreDto) {
    return this.luchadoresService.create(createLuchadoreDto);
  }

  @Get()
  findAll() {
    return this.luchadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.luchadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLuchadoreDto: UpdateLuchadoreDto) {
    return this.luchadoresService.update(+id, updateLuchadoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.luchadoresService.remove(+id);
  }
}
