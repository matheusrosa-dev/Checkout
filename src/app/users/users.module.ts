import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from './entities';
import { RolesRepository, UsersRepository } from './repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, RolesRepository],
  imports: [TypeOrmModule.forFeature([User, Role])],
  exports: [UsersRepository, RolesRepository],
})
export class UsersModule {}
