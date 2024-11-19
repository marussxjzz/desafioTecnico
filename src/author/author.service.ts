import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async create(authorData: CreateAuthorDto): Promise<Author> {
    const fullName = `${authorData.nombre} ${authorData.apellido}`.trim();

    const existingAuthor = await this.authorRepository.findOne({
      where: [{ dni: authorData.dni }, { fullName }],
    });
    if (existingAuthor) {
      throw new BadRequestException(
        'An author with this DNI or name already exists.',
      );
    }

    const author = this.authorRepository.create({
      ...authorData,
      fullName,
    });

    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException('Author not found.');
    }
    return author;
  }

  async update(id: number, authorData: CreateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    Object.assign(author, authorData);
    return this.authorRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    const result = await this.authorRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Author not found.');
    }
  }
}
