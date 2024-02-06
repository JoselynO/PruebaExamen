import { PartialType } from '@nestjs/mapped-types';
import { CreateLuchadoreDto } from './create-luchadore.dto';

export class UpdateLuchadoreDto extends PartialType(CreateLuchadoreDto) {}
