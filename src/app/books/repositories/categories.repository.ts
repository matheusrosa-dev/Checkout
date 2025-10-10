import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities';

@Injectable()
export class CategoriesRepository extends BaseRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly repository: BaseRepository<Category>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
