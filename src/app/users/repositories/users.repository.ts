import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: BaseRepository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
