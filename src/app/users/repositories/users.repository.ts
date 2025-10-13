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

  findByFieldWithRole(field: 'id' | 'email', value: string) {
    return this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where(`user.${field} = :value`, { value })
      .getOne();
  }
}
