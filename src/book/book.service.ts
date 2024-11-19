import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { Author } from '../entities/author.entity';
import { Editorial } from '../entities/editorial.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Editorial)
    private editorialRepository: Repository<Editorial>,
  ) {}

  async create(bookData: CreateBookDto): Promise<Book> {
    const authors = await this.authorRepository.findBy({
      fullName: In(bookData.autores),
    });

    if (!authors.length || authors.length !== bookData.autores.length) {
      throw new BadRequestException('One or more authors not found.');
    }

    const editorial = await this.editorialRepository.findOne({
      where: { id: bookData.editorial },
    });

    if (!editorial) {
      throw new NotFoundException('Editorial not found.');
    }

    const book = this.bookRepository.create({
      ...bookData,
      autores: authors,
      editorial: editorial,
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['autores', 'editorial'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['autores', 'editorial'],
    });

    if (!book) {
      throw new NotFoundException('Libro no encontrado.');
    }
    return book;
  }

  async update(id: number, authorData: CreateBookDto): Promise<Author> {
    const author = await this.findOne(id);
    Object.assign(author, authorData);
    return this.authorRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Libro no encontrado.');
    }
  }
}
