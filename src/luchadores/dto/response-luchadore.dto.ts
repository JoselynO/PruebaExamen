import { Elemento } from '../entities/luchadore.entity';

export class ResponseLuchadoreDto {
  id: string;
  nombre: string;
  avatar: string;
  poder: number;
  ataqueFinal: string;
  createdAt: Date;
  updatedAt: Date;
  raza: string;
  isDeleted: boolean;
  tipoElemento: Elemento;
}
