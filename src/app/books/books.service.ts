import { Injectable } from '@nestjs/common';
import { BooksRepository, CategoriesRepository } from './repositories';

@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}
}
