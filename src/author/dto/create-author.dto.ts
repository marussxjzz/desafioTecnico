import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, Length } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Nombre del autor', example: 'Gabriel' })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Apellido del autor',
    example: 'García Márquez',
  })
  @IsString()
  apellido: string;

  @ApiProperty({ description: 'DNI del autor', example: '12345678' })
  @Matches(/^\d+$/, {
    message: 'El DNI debe ser un número.',
  })
  @Length(7, 8, {
    message: 'El DNI debe tener entre 7 y 8 dígitos.',
  })
  dni: string;

  @ApiProperty({
    description: 'Nacionalidad del autor',
    example: 'Colombiano',
  })
  @IsString()
  nacionalidad: string;
}
