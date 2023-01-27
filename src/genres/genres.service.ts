import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}
  create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const newGenre: Genre = this.genresRepository.create(createGenreDto);
    return this.genresRepository.save(newGenre);
  }

  findAll(): Promise<Genre[]> {
    return this.genresRepository.find();
  }

  findOne(id: number): Promise<Genre> {
    return this.genresRepository.findOneBy({ id });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    let genre: Genre = await this.findOne(id);
    genre = { ...genre, ...updateGenreDto };
    return this.genresRepository.save(genre);
  }

  async remove(id: number): Promise<Genre> {
    const genre: Genre = await this.findOne(id);
    return this.genresRepository.remove(genre);
  }
}
