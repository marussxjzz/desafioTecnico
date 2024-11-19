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
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un libro',
    description: 'Crea un nuevo libro en la librería.',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un libro.',
    schema: {
      example: {
        autores: ['Gabriel García Márquez'],
        editorial: 1,
        titulo: 'Cien Años de Soledad',
        categoriaLiteraria: 'Novela',
        precio: 20000,
        fechaLanzamiento: '18/11/2024',
        descripcion: 'Cien Años de Soledad.',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El libro fue creado con éxito.',
    schema: {
      example: {
        statusCode: 201,
        message: 'Libro creado con éxito.',
        data: {
          id: 1,
          titulo: 'Cien Años de Soledad',
          categoriaLiteraria: 'Novela',
          precio: 20000,
          fechaLanzamiento: '2024-11-18',
          descripcion: 'Cien Años de Soledad.',
          autores: [{ id: 1, fullName: 'Gabriel García Márquez' }],
          editorial: { id: 1, nombre: 'Editorial Sudamericana' },
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
          'El campo "titulo" es requerido.',
          'El formato de la fecha es inválido.',
        ],
      },
    },
  })
  async create(@Body() bookData: CreateBookDto) {
    return this.bookService.create(bookData);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos los libros',
    description: 'Muestra todos los libros registrados en la librería.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de libros obtenida con éxito.',
    schema: {
      example: [
        {
          id: 1,
          titulo: 'Cien Años de Soledad',
          categoriaLiteraria: 'Novela',
          precio: 20000,
          fechaLanzamiento: '2024-11-18',
          descripcion: 'Cien Años de Soledad.',
          autores: [{ id: 1, fullName: 'Gabriel García Márquez' }],
          editorial: { id: 1, nombre: 'Editorial Sudamericana' },
        },
        {
          id: 2,
          titulo: 'El Amor en los Tiempos del Cólera',
          categoriaLiteraria: 'Novela',
          precio: 18000,
          fechaLanzamiento: '2023-05-14',
          descripcion: 'Otro libro  de Gabriel García Márquez.',
          autores: [{ id: 1, fullName: 'Gabriel García Márquez' }],
          editorial: { id: 1, nombre: 'Editorial Sudamericana' },
        },
      ],
    },
  })
  async findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un libro por ID',
    description: 'Devuelve un libro específico basado en su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Libro obtenido con éxito.',
    schema: {
      example: {
        id: 1,
        titulo: 'Cien Años de Soledad',
        categoriaLiteraria: 'Novela',
        precio: 20000,
        fechaLanzamiento: '2024-11-18',
        descripcion: 'Cien Años de Soledad.',
        autores: [{ id: 1, fullName: 'Gabriel García Márquez' }],
        editorial: { id: 1, nombre: 'Editorial Sudamericana' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Libro no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'El libro solicitado no existe.',
      },
    },
  })
  async findOne(@Param('id') id: number) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un libro',
    description: 'Actualiza los datos de un libro existente.',
  })
  @ApiBody({
    description: 'Datos necesarios para actualizar el libro.',
    schema: {
      example: {
        autores: ['Gabriel García Márquez'],
        editorial: 1,
        titulo: 'Cien Años de Soledad - Edición Actualizada',
        categoriaLiteraria: 'Novela',
        precio: 25000,
        fechaLanzamiento: '2024-12-01',
        descripcion: 'Edición actualizada de Cien Años de Soledad.',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Libro actualizado con éxito.',
    schema: {
      example: {
        statusCode: 200,
        message: 'Libro actualizado con éxito.',
        data: {
          id: 1,
          titulo: 'Cien Años de Soledad - Edición Actualizada',
          categoriaLiteraria: 'Novela',
          precio: 25000,
          fechaLanzamiento: '2024-12-01',
          descripcion: 'Edición actualizada de Cien Años de Soledad.',
          autores: [{ id: 1, fullName: 'Gabriel García Márquez' }],
          editorial: { id: 1, nombre: 'Editorial Sudamericana' },
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
          'El campo "titulo" es requerido.',
          'El formato de la fecha es inválido.',
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Libro no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'El libro solicitado no existe.',
      },
    },
  })
  async update(@Param('id') id: number, @Body() bookData: CreateBookDto) {
    return this.bookService.update(id, bookData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un libro',
    description: 'Elimina un libro basado en su ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'Libro eliminado con éxito.',
  })
  @ApiResponse({
    status: 404,
    description: 'Libro no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        error: 'Not Found',
        message: 'El libro solicitado no existe.',
      },
    },
  })
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    await this.bookService.remove(id);
  }
}
