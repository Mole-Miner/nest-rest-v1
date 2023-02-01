import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Book } from '../../books/entities/book.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Book, ({ genres }: Book) => genres)
  books: Book[];
}
