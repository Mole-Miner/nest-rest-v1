import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Author } from '../../authors/entities/author.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  pages: number;

  @ManyToOne(() => Author, ({ books }: Author) => books)
  author: Author;

  @ManyToMany(() => Genre, ({ books }: Genre) => books)
  @JoinTable()
  genres: Genre[];
}
