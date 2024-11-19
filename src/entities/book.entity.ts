import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Author } from './author.entity';
import { Editorial } from './editorial.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Author, (author) => author.id)
  @JoinTable()
  autores: Author[];

  @ManyToOne(() => Editorial, (editorial) => editorial.id)
  editorial: Editorial;

  @Column()
  titulo: string;

  @Column()
  categoriaLiteraria: string;

  @Column('decimal')
  precio: number;

  @Column()
  fechaLanzamiento: string;

  @Column('text')
  descripcion: string;
}
