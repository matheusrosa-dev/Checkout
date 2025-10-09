import { Expose } from 'class-transformer';

export class AuthDto {
  @Expose()
  name: string;

  @Expose()
  email: string;
}
