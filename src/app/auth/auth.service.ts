import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async register(registerDto: RegisterDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (foundUser) {
      throw new ConflictException('User already exists');
    }

    const createdUser = this.usersRepository.create(registerDto);

    await this.usersRepository.save(createdUser);

    return createdUser;
  }
}
