import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Author } from '../entities/author.entity';
import { Editorial } from '../entities/editorial.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('BookService', () => {
  let service: BookService;
  let bookRepository: Partial<Record<keyof Repository<Book>, jest.Mock>>;
  let authorRepository: Partial<Record<keyof Repository<Author>, jest.Mock>>;
  let editorialRepository: Partial<
    Record<keyof Repository<Editorial>, jest.Mock>
  >;

  const mockBook = {
    id: 1,
    titulo: 'Cien Años de Soledad',
    categoriaLiteraria: 'Novela',
    precio: 20000,
    fechaLanzamiento: '18-11-2024',
    descripcion: 'Cien Años de Soledad.',
    autores: [{ id: 1, fullName: 'Gabriel García Márquez' }],
    editorial: { id: 1, nombre: 'Editorial Sudamericana' },
  };

  const mockCreateBookDto = {
    autores: ['Gabriel García Márquez'],
    editorial: 1,
    titulo: 'Cien Años de Soledad',
    categoriaLiteraria: 'Novela',
    precio: 20000,
    fechaLanzamiento: '18-11-2024',
    descripcion: 'Cien Años de Soledad.',
  };

  beforeEach(async () => {
    bookRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    authorRepository = {
      findBy: jest.fn(),
    };

    editorialRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getRepositoryToken(Book), useValue: bookRepository },
        { provide: getRepositoryToken(Author), useValue: authorRepository },
        {
          provide: getRepositoryToken(Editorial),
          useValue: editorialRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a book successfully', async () => {
    authorRepository.findBy.mockResolvedValue(
      mockCreateBookDto.autores.map((name) => ({ id: 1, fullName: name })),
    );
    editorialRepository.findOne.mockResolvedValue(mockBook.editorial);
    bookRepository.create.mockReturnValue(mockBook);
    bookRepository.save.mockResolvedValue(mockBook);

    const result = await service.create(mockCreateBookDto);

    expect(authorRepository.findBy).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: expect.any(Object),
      }),
    );
    expect(editorialRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockCreateBookDto.editorial },
    });
    expect(bookRepository.create).toHaveBeenCalledWith({
      ...mockCreateBookDto,
      autores: [{ id: 1, fullName: 'Gabriel García Márquez' }],
      editorial: mockBook.editorial,
    });
    expect(bookRepository.save).toHaveBeenCalled();
    expect(result).toEqual(mockBook);
  });

  it('should throw BadRequestException if authors not found', async () => {
    authorRepository.findBy.mockResolvedValue([]);

    await expect(service.create(mockCreateBookDto)).rejects.toThrow(
      BadRequestException,
    );

    expect(authorRepository.findBy).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: expect.any(Object),
      }),
    );
  });

  it('should throw NotFoundException if editorial not found', async () => {
    authorRepository.findBy.mockResolvedValue(
      mockCreateBookDto.autores.map((name) => ({ id: 1, fullName: name })),
    );
    editorialRepository.findOne.mockResolvedValue(null);

    await expect(service.create(mockCreateBookDto)).rejects.toThrow(
      NotFoundException,
    );
    expect(editorialRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockCreateBookDto.editorial },
    });
  });

  it('should return all books', async () => {
    bookRepository.find.mockResolvedValue([mockBook]);

    const result = await service.findAll();

    expect(bookRepository.find).toHaveBeenCalledWith({
      relations: ['autores', 'editorial'],
    });
    expect(result).toEqual([mockBook]);
  });

  it('should return a book by ID', async () => {
    bookRepository.findOne.mockResolvedValue(mockBook);

    const result = await service.findOne(1);

    expect(bookRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['autores', 'editorial'],
    });
    expect(result).toEqual(mockBook);
  });

  it('should throw NotFoundException if book not found', async () => {
    bookRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    expect(bookRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['autores', 'editorial'],
    });
  });

  it('should remove a book by ID', async () => {
    bookRepository.delete.mockResolvedValue({ affected: 1 });

    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(bookRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if book to remove is not found', async () => {
    bookRepository.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    expect(bookRepository.delete).toHaveBeenCalledWith(1);
  });
});
