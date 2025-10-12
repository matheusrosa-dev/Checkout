import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from './dtos';
import { RolesRepository, UsersRepository } from '../users/repositories';
import { AuthTokensService } from '../../providers/redis/auth-tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private rolesRepository: RolesRepository,
    private authTokensService: AuthTokensService,
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

    const tokens = await this.authTokensService.generateOpaqueTokens({
      userId: createdUser.id,
      role: createdUser.role.name,
    });

    return tokens;
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

    const tokens = await this.authTokensService.generateOpaqueTokens({
      userId: foundUser.id,
      role: foundUser.role.name,
    });

    return tokens;
  }

  async refreshSession(userId: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    await this.authTokensService.revokeTokensByUserId(userId);

    if (!foundUser) {
      throw new ForbiddenException('Invalid session');
    }

    await this.authTokensService.revokeTokensByUserId(userId);

    const tokens = await this.authTokensService.generateOpaqueTokens({
      userId: foundUser.id,
      role: foundUser.role.name,
    });

    return tokens;
  }

  async logout(userId: string) {
    await this.authTokensService.revokeTokensByUserId(userId);
  }
}
