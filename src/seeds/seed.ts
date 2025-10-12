import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { RolesRepository, UsersRepository } from '../app/users/repositories';
import { Roles } from '../app/users/enums';
import { seedRoles } from './roles';
import { seedUsers } from './users';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const usersRepository = app.get(UsersRepository);
  const rolesRepository = app.get(RolesRepository);

  await seedRoles(rolesRepository);

  const adminRole = await rolesRepository.findOne({
    where: { name: Roles.ADMIN },
  });

  await seedUsers({
    adminRole: adminRole!,
    usersRepository,
  });

  await app.close();
  process.exit(0);
}
bootstrap();
