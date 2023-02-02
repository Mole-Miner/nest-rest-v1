import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { genreIds, ...bookData } = createBookDto;
    const newBook: Book = this.booksRepository.create(bookData);
    const savedBook: Book = await this.booksRepository.save(newBook);
    const query: string = genreIds
      .map(
        (genreId: number) =>
          `INSERT INTO book_genres_genre(bookId, genreId) VALUES(${savedBook.id}, ${genreId})`,
      )
      .join('; ')
      .concat(';');
    await this.booksRepository.query(query);
    return savedBook;
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    let book: Book = await this.findOne(id);
    book = { ...book, ...updateBookDto };
    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<Book> {
    const book: Book = await this.findOne(id);
    return this.booksRepository.remove(book);
  }
}
