import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository, CategoriesRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, Category } from './entities';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, CategoriesRepository],
  imports: [TypeOrmModule.forFeature([Book, Category])],
})
export class BooksModule {}
