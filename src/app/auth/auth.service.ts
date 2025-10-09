import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersRepository } from '../users/repositories/users.repository';
import { TokensService } from './tokens.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private tokensService: TokensService,
  ) {}

  async register(registerDto: RegisterDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (foundUser) {
      throw new ConflictException('User already exists');
    }

    const createdUser = this.usersRepository.create(registerDto);

    await this.usersRepository.save(createdUser);

    const tokens = await this.tokensService.generateOpaqueTokens({
      userId: createdUser.id,
      role: createdUser.role,
    });

    return {
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = foundUser.comparePassword(loginDto.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.tokensService.generateOpaqueTokens({
      userId: foundUser.id,
      role: foundUser.role,
    });

    return {
      ...tokens,
    };
  }
}
