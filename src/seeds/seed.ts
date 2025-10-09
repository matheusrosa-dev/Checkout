import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersRepository } from '../app/users/repositories';
import { Role } from '../app/users/enums';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  const usersRepository = app.get(UsersRepository);

  const adminExists = await usersRepository.findOne({
    where: { email: 'admin@email.com' },
  });

  if (!adminExists) {
    const admin = usersRepository.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: '12345Aa',
      role: Role.ADMIN,
    });

    await usersRepository.save(admin);
    console.log('✅  Usuário admin criado');
  } else {
    console.log('ℹ️  Usuário admin já existe');
  }

  await app.close();
  process.exit(0);
}
bootstrap();
