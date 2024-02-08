import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRazaDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  @Matches(/^(ANDROIDES|TERRICOLAS|FREEZA|NAMEKIANOS|SAIYANS)$/i, {
    message:
      'El nombre debe ser ANDROIDES, TERRICOLAS, FREEZA, NAMEKIANOS, SAIYANS',
  })
  @Transform((nombre) => nombre.value.toUpperCase())
  nombre: string;
}
