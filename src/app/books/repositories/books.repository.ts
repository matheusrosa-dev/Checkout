import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BooksRepository extends BaseRepository<Book> {
  constructor(
    @InjectRepository(Book)
    private readonly repository: BaseRepository<Book>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
