import { Test, TestingModule } from '@nestjs/testing';
import { EditorialService } from './editorial.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Editorial } from '../entities/editorial.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('EditorialService', () => {
  let service: EditorialService;
  let repository: Partial<Record<keyof Repository<Editorial>, jest.Mock>>;

  const mockEditorial = {
    id: 1,
    nombre: 'Editorial Sudamericana',
    direccion: 'Humberto Primo 555, Capital Federal',
    cuit: '20-12345678-9',
  };

  const mockCreateEditorialDto = {
    nombre: 'Editorial Sudamericana',
    direccion: 'Humberto Primo 555, Capital Federal',
    cuit: '20-12345678-9',
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
        EditorialService,
        {
          provide: getRepositoryToken(Editorial),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<EditorialService>(EditorialService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an editorial successfully', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.create.mockReturnValue(mockEditorial);
    repository.save.mockResolvedValue(mockEditorial);

    const result = await service.create(mockCreateEditorialDto);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { cuit: mockCreateEditorialDto.cuit },
    });
    expect(repository.create).toHaveBeenCalledWith(mockCreateEditorialDto);
    expect(repository.save).toHaveBeenCalled();
    expect(result).toEqual(mockEditorial);
  });

  it('should throw BadRequestException if CUIT already exists', async () => {
    repository.findOne.mockResolvedValue(mockEditorial);

    await expect(service.create(mockCreateEditorialDto)).rejects.toThrow(
      BadRequestException,
    );
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { cuit: mockCreateEditorialDto.cuit },
    });
  });

  it('should return all editorials', async () => {
    repository.find.mockResolvedValue([mockEditorial]);

    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockEditorial]);
  });

  it('should return an editorial by ID', async () => {
    repository.findOne.mockResolvedValue(mockEditorial);

    const result = await service.findOne(1);

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockEditorial);
  });

  it('should throw NotFoundException if editorial not found', async () => {
    repository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update an editorial successfully', async () => {
    repository.findOne.mockResolvedValue(mockEditorial);
    repository.save.mockResolvedValue({
      ...mockEditorial,
      direccion: 'Humberto Primo 444, Capital Federal',
    });

    const result = await service.update(1, {
      ...mockCreateEditorialDto,
      direccion: 'Humberto Primo 444, Capital Federal',
    });

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalled();
    expect(result.direccion).toEqual('Humberto Primo 444, Capital Federal');
  });

  it('should remove an editorial by ID', async () => {
    repository.delete.mockResolvedValue({ affected: 1 });

    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if editorial to remove is not found', async () => {
    repository.delete.mockResolvedValue({ affected: 0 });

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
