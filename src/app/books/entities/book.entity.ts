import { Column, Entity, ManyToMany } from 'typeorm';
import { Category } from './category.entity';
import { BaseEntity } from '../../../common/entities';

@Entity('books')
export class Book extends BaseEntity<Book> {
  @Column()
  title: string;

  @ManyToMany(() => Category, (category) => category.books, {
    onDelete: 'RESTRICT',
  })
  categories: Category[];
}
