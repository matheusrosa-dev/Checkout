import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
}
