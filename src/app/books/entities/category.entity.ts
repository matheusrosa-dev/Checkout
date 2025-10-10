import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Book } from './book.entity';
import { BaseEntity } from '../../../common/entities';

@Entity('categories')
export class Category extends BaseEntity<Category> {
  @Column()
  name: string;

  @ManyToMany(() => Book, (book) => book.categories, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  @JoinTable()
  books: Book[];
}
