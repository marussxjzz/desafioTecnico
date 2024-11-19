import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Editorial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column({ unique: true })
  cuit: string;
}
