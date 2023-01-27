import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'memory',
      entities: ['dist/**/*.entity.{.ts,.js}'],
      synchronize: true,
    }),
    AuthorsModule,
    BooksModule,
    GenresModule,
  ],
})
export class AppModule {}
