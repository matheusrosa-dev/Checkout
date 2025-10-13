import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/repositories';

@Injectable()
export class MeService {
  constructor(private usersRepository: UsersRepository) {}

  async findMe(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) throw new ForbiddenException('Your session is invalid');

    return user;
  }
}
