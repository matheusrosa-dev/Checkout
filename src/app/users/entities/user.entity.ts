import { BeforeInsert, Column, Entity, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../enums';
import { BaseEntity } from '../../../common/entities';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity<User> {
  @Column({ length: 50 })
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ length: 50 })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  comparePassword(attempt: string): boolean {
    return bcrypt.compareSync(attempt, this.password);
  }
}
