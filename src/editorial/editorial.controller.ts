import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateEditorialDto } from './dto/create-editorial.dto';

@ApiTags('editorials')
@Controller('editorials')
export class EditorialController {
  constructor(private readonly editorialService: EditorialService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear editorial',
    description: 'Crea una nueva editorial.',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una editorial.',
    schema: {
      example: {
        nombre: 'Editorial Sudamericana',
        direccion: '123 Calle Principal',
        cuit: '20-12345678-9',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Editorial creada con éxito.',
    schema: {
      example: {
        statusCode: 201,
        message: 'Editorial creada con éxito.',
        data: {
          id: 1,
          nombre: 'Editorial Sudamericana',
          direccion: '123 Calle Principal',
          cuit: '20-12345678-9',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Error en los datos enviados.',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: [
          'El campo "nombre" es requerido.',
          'El CUIT debe tener un formato válido.',
        ],
      },
    },
  })
  async create(@Body() editorialData: CreateEditorialDto) {
    return this.editorialService.create(editorialData);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas las editoriales',
    description: 'Muestra todas las editoriales registradas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de editoriales obtenida con éxito.',
    schema: {
      example: [
        {
          id: 1,
          nombre: 'Editorial Sudamericana',
          direccion: '123 Calle Principal',
          cuit: '20-12345678-9',
        },
        {
          id: 2,
          nombre: 'Editorial Alfaguara',
          direccion: '456 Avenida Secundaria',
          cuit: '30-87654321-8',
        },
      ],
    },
  })
  async findAll() {
    return this.editorialService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una editorial por ID',
    description: 'Devuelve una editorial específica basada en su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Editorial obtenida con éxito.',
    schema: {
      example: {
        id: 1,
        nombre: 'Editorial Sudamericana',
        direccion: '123 Calle Principal',
        cuit: '20-12345678-9',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Editorial no encontrada.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'La editorial solicitada no existe.',
      },
    },
  })
  async findOne(@Param('id') id: number) {
    return this.editorialService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una editorial',
    description: 'Actualiza los datos de una editorial existente.',
  })
  @ApiBody({
    description: 'Datos necesarios para actualizar la editorial.',
    schema: {
      example: {
        nombre: 'Editorial Sudamericana Actualizada',
        direccion: 'Nueva Dirección',
        cuit: '20-12345678-9',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Editorial actualizada con éxito.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Editorial actualizada con éxito.',
        data: {
          id: 1,
          nombre: 'Editorial Sudamericana Actualizada',
          direccion: 'Nueva Dirección',
          cuit: '20-12345678-9',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos enviados.',
    schema: {
      example: {
        statusCode: 400,
        error: 'Bad Request',
        message: [
          'El campo "nombre" es requerido.',
          'El CUIT debe tener un formato válido.',
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Editorial no encontrada.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'La editorial solicitada no existe.',
      },
    },
  })
  async update(
    @Param('id') id: number,
    @Body() editorialData: CreateEditorialDto,
  ) {
    return this.editorialService.update(id, editorialData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una editorial',
    description: 'Elimina una editorial basada en su ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'Editorial eliminada con éxito.',
  })
  @ApiResponse({
    status: 404,
    description: 'Editorial no encontrada.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'La editorial solicitada no existe.',
      },
    },
  })
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    await this.editorialService.remove(id);
  }
}
