import { Role } from '../app/users/entities';
import { UsersRepository } from '../app/users/repositories';

async function seedUsers(props: {
  usersRepository: UsersRepository;
  adminRole: Role;
}) {
  const { usersRepository, adminRole } = props;

  const adminExists = await usersRepository.findOne({
    where: { email: 'admin@email.com' },
  });

  if (!adminExists) {
    const admin = usersRepository.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: '12345Aa',
      role: adminRole,
    });

    await usersRepository.save(admin);
    console.log('✅ Usuário admin criado');
  } else {
    console.log('ℹ️  Usuário admin já existe');
  }
}

export { seedUsers };
