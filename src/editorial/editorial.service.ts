import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editorial } from '../entities/editorial.entity';
import { CreateEditorialDto } from './dto/create-editorial.dto';

@Injectable()
export class EditorialService {
  constructor(
    @InjectRepository(Editorial)
    private editorialRepository: Repository<Editorial>,
  ) {}

  async create(editorialData: CreateEditorialDto): Promise<Editorial> {
    const existingEditorial = await this.editorialRepository.findOne({
      where: { cuit: editorialData.cuit },
    });

    if (existingEditorial) {
      throw new BadRequestException(
        'An editorial with this CUIT already exists.',
      );
    }

    const editorial = this.editorialRepository.create(editorialData);
    return this.editorialRepository.save(editorial);
  }

  async findAll(): Promise<Editorial[]> {
    return this.editorialRepository.find();
  }

  async findOne(id: number): Promise<Editorial> {
    const editorial = await this.editorialRepository.findOne({
      where: { id },
    });

    if (!editorial) {
      throw new NotFoundException('Editorial not found.');
    }
    return editorial;
  }

  async update(
    id: number,
    editorialData: CreateEditorialDto,
  ): Promise<Editorial> {
    const editorial = await this.findOne(id);
    Object.assign(editorial, editorialData);
    return this.editorialRepository.save(editorial);
  }
  async remove(id: number): Promise<void> {
    const result = await this.editorialRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Editorial not found.');
    }
  }
}
