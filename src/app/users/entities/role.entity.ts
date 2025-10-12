import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Roles } from '../enums';

@Entity('roles')
@Unique(['name'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
  })
  name: Roles;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
