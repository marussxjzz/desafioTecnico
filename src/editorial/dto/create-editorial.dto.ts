import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateEditorialDto {
  @ApiProperty({
    description: 'Nombre de la editorial',
    example: 'Editorial Sudamericana',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Dirección',
    example: 'Humberto Primo 555, Capital Federal',
  })
  @IsString()
  direccion: string;

  @ApiProperty({
    description: 'CUIT de la editorial',
    example: '20-12345678-9',
  })
  @Matches(/^\d{2}-\d{7,8}-\d$/, {
    message:
      'El CUIT debe estar en el formato XX-XXXXXXX-X y los números deben ser válidos.',
  })
  cuit: string;
}
