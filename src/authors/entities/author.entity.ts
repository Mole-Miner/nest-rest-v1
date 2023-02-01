import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Book } from '../../books/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true, type: 'date' })
  birthday: string;

  @Column({ nullable: true })
  nationality: string;

  @OneToMany(() => Book, ({ author }: Book) => author)
  books: Book[];
}
