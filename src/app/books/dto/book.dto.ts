import { Expose, Type } from 'class-transformer';

export class BookDto {
  @Expose()
  @Type(() => BookDto)
  books: BookDto[];

  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  createdAt: string;
}
