import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from './entities';
import { RolesRepository, UsersRepository } from './repositories';

@Module({
  providers: [UsersRepository, RolesRepository],
  imports: [TypeOrmModule.forFeature([User, Role])],
  exports: [UsersRepository, RolesRepository],
})
export class UsersModule {}
