import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Raza } from '../../razas/entities/raza.entity';

@Entity({ name: 'luchadores' })
export class Luchadore {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', length: 75, nullable: false })
  nombre: string;

  @Column({ type: 'enum', nullable: false})
  tipoElemento: Elemento;

  @Column({ type: 'text', default: 'https://via.placeholder.com/150' })
  avatar: string;

  @Column({ type: 'double precision', default: 0.0 })
  poder: number;

  @Column({ type: 'varchar', nullable: false })
  ataqueFinal: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToOne(() => Raza, (raza) => raza.luchadores)
  @JoinColumn({ name: 'raza_id' })
  raza: Raza;
}

export enum Elemento {
  AGUA = 'AGUA',
  TIERA = 'TIERA',
  FUEGO = 'FUEGO',
  AIRE = 'AIRE',
}
