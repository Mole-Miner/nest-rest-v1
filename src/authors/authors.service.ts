import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}
  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor: Author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(newAuthor);
  }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  findOne(id: number): Promise<Author> {
    return this.authorsRepository.findOneBy({ id });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    let author: Author = await this.findOne(id);
    author = { ...author, ...updateAuthorDto };
    return this.authorsRepository.save(author);
  }

  async remove(id: number) {
    const author: Author = await this.findOne(id);
    return this.authorsRepository.remove(author);
  }
}
