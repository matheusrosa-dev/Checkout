import { Roles } from '../app/users/enums';
import { RolesRepository } from '../app/users/repositories';

async function seedRoles(rolesRepository: RolesRepository) {
  const storedRoles = await rolesRepository.find();
  const roles = Object.values(Roles);

  const rolesToCreate = roles.filter(
    (role) => !storedRoles.some((storedRole) => storedRole.name === role),
  );

  if (rolesToCreate.length) {
    await Promise.all(
      rolesToCreate.map((role) => {
        rolesRepository.create({
          name: role,
        });

        return rolesRepository.save({ name: role });
      }),
    );
    console.log('✅ Roles criadas');
  } else {
    console.log('ℹ️  Roles já existem');
  }
}

export { seedRoles };
