import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Validate } from 'class-validator';
import { parse, isValid } from 'date-fns';
import { IsCustomDate } from 'src/validators/custom-date-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CreateBookDto {
  @ApiProperty({
    description: 'Lista de nombres de autor',
    example: ['Gabriel García Márquez'],
  })
  @IsArray()
  @IsString({ each: true })
  autores: string[];

  @ApiProperty({ description: 'ID de la editorial', example: 1 })
  @IsNumber()
  editorial: number;

  @ApiProperty({
    description: 'Título del libro',
    example: 'Cien Años de Soledad',
  })
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'Categoría literaria del libro',
    example: 'Novela',
  })
  @IsString()
  categoriaLiteraria: string;

  @ApiProperty({ description: 'Precio del libro', example: 20000 })
  @IsNumber()
  precio: number;

  @ApiProperty({
    description: 'Fecha de lanzamiento (formato DD/MM/AAAA o DD/MM/AA)',
    example: '18/11/2024',
  })
  @Validate(IsCustomDate)
  @Transform(({ value }) => {
    const isShortYear = /^\d{2}\/\d{2}\/\d{2}$/.test(value);
    const formatString = isShortYear ? 'dd/MM/yy' : 'dd/MM/yyyy';
    const parsedDate = parse(value, formatString, new Date());

    if (!isValid(parsedDate)) {
      throw new BadRequestException(
        'Fecha de lanzamiento debe ser válida y seguir el formato DD/MM/AAAA o DD/MM/AA',
      );
    }

    return parsedDate.toISOString();
  })
  fechaLanzamiento: string;

  @ApiProperty({
    description: 'Descripción del libro',
    example: 'Cien Años de Soledad',
  })
  @IsString()
  descripcion: string;
}
