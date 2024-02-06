import { Injectable } from '@nestjs/common';
import { CreateLuchadoreDto } from './dto/create-luchadore.dto';
import { UpdateLuchadoreDto } from './dto/update-luchadore.dto';

@Injectable()
export class LuchadoresService {
  create(createLuchadoreDto: CreateLuchadoreDto) {
    return 'This action adds a new luchadore';
  }

  findAll() {
    return `This action returns all luchadores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} luchadore`;
  }

  update(id: number, updateLuchadoreDto: UpdateLuchadoreDto) {
    return `This action updates a #${id} luchadore`;
  }

  remove(id: number) {
    return `This action removes a #${id} luchadore`;
  }
}
