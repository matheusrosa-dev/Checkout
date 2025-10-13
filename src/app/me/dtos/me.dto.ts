import { Expose } from 'class-transformer';

export class MeDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: string;
}
