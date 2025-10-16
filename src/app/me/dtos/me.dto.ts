import { Expose, Transform } from 'class-transformer';

export class MeDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.role.name)
  role: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: string;
}
