import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository, CategoriesRepository } from './repositories';

@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll() {
    const books = await this.booksRepository.find();

    return {
      books,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
