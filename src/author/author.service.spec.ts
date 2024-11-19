import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('AuthorService', () => {
  let service: AuthorService;
  let repository: Partial<Record<keyof Repository<Author>, jest.Mock>>;

  const mockAuthor = {
    id: 1,
    nombre: 'Gabriel',
    apellido: 'García Márquez',
    dni: '12345678',
    nacionalidad: 'Colombiano',
    fullName: 'Gabriel García Márquez',
  };

  const mockCreateAuthorDto = {
    nombre: 'Gabriel',
    apellido: 'García Márquez',
    dni: '12345678',
    nacionalidad: 'Colombiano',
  };

  beforeEach(async () => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an author successfully', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.create.mockReturnValue(mockAuthor);
    repository.save.mockResolvedValue(mockAuthor);

    const result = await service.create(mockCreateAuthorDto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: [
        { dni: mockCreateAuthorDto.dni },
        { fullName: mockAuthor.fullName },
      ],
    });
    expect(repository.create).toHaveBeenCalledWith({
      ...mockCreateAuthorDto,
      fullName: mockAuthor.fullName,
    });
    expect(repository.save).toHaveBeenCalled();
    expect(result).toEqual(mockAuthor);
  });

  it('should throw BadRequestException if an author with the same DNI or name exists', async () => {
    repository.findOne.mockResolvedValue(mockAuthor);

    await expect(service.create(mockCreateAuthorDto)).rejects.toThrow(
      BadRequestException,
    );
    expect(repository.findOne).toHaveBeenCalledWith({
      where: [
        { dni: mockCreateAuthorDto.dni },
        { fullName: mockAuthor.fullName },
      ],
    });
  });

  it('should return all authors', async () => {
    repository.find.mockResolvedValue([mockAuthor]);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockAuthor]);
  });

  it('should return an author by ID', async () => {
    repository.findOne.mockResolvedValue(mockAuthor);

    const result = await service.findOne(1);

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockAuthor);
  });

  it('should throw NotFoundException if author not found', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update an author successfully', async () => {
    repository.findOne.mockResolvedValue(mockAuthor);
    repository.save.mockResolvedValue({
      ...mockAuthor,
      nacionalidad: 'Mexicano',
    });

    const result = await service.update(1, {
      ...mockCreateAuthorDto,
      nacionalidad: 'Mexicano',
    });

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalled();
    expect(result.nacionalidad).toEqual('Mexicano');
  });

  it('should remove an author by ID', async () => {
    repository.delete.mockResolvedValue({ affected: 1 });

    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if author to remove is not found', async () => {
    repository.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
