import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Book } from '../../books/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  nationality: string;

  @OneToMany(() => Book, ({ author }: Book) => author)
  books: Book[];
}
