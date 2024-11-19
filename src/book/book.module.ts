import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Author } from '../entities/author.entity';
import { Editorial } from '../entities/editorial.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Editorial])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
