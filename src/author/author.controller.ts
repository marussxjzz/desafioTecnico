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
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un autor',
    description: 'Crea un nuevo autor.',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un autor.',
    schema: {
      example: {
        nombre: 'Gabriel',
        apellido: 'García Márquez',
        dni: '12345678',
        nacionalidad: 'Colombiana',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El autor fue creado con éxito.',
    schema: {
      example: {
        statusCode: 201,
        message: 'Autor creado con éxito.',
        data: {
          id: 1,
          nombre: 'Gabriel',
          apellido: 'García Márquez',
          dni: '12345678',
          nacionalidad: 'Colombiana',
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
          'El DNI debe ser un número válido.',
        ],
      },
    },
  })
  async create(@Body() authorData: CreateAuthorDto) {
    return this.authorService.create(authorData);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos los autores',
    description: 'Muestra todos los autores registrados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de autores obtenida con éxito.',
    schema: {
      example: [
        {
          id: 1,
          nombre: 'Gabriel',
          apellido: 'García Márquez',
          dni: '12345678',
          nacionalidad: 'Colombiana',
        },
        {
          id: 2,
          nombre: 'Isabel',
          apellido: 'Allende',
          dni: '87654321',
          nacionalidad: 'Chilena',
        },
      ],
    },
  })
  async findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un autor por ID',
    description: 'Devuelve un autor específico basado en su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Autor obtenido con éxito.',
    schema: {
      example: {
        id: 1,
        nombre: 'Gabriel',
        apellido: 'García Márquez',
        dni: '12345678',
        nacionalidad: 'Colombiana',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Autor no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'El autor solicitado no existe.',
      },
    },
  })
  async findOne(@Param('id') id: number) {
    return this.authorService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un autor',
    description: 'Actualiza los datos de un autor existente.',
  })
  @ApiBody({
    description: 'Datos necesarios para actualizar el autor.',
    schema: {
      example: {
        nombre: 'Gabriel',
        apellido: 'García Márquez',
        dni: '24681012',
        nacionalidad: 'Colombiana',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Autor actualizado con éxito.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Autor actualizado con éxito.',
        data: {
          id: 1,
          nombre: 'Gabriel',
          apellido: 'García Márquez',
          dni: '24681012',
          nacionalidad: 'Colombiana',
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
          'El DNI debe ser un número válido.',
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Autor no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'El autor solicitado no existe.',
      },
    },
  })
  async update(@Param('id') id: number, @Body() authorData: CreateAuthorDto) {
    return this.authorService.update(id, authorData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un autor',
    description: 'Elimina un autor basado en su ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'Autor eliminado con éxito.',
  })
  @ApiResponse({
    status: 404,
    description: 'Autor no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'El autor solicitado no existe.',
      },
    },
  })
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    await this.authorService.remove(id);
  }
}
