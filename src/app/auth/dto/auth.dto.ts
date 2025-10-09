import { Expose } from 'class-transformer';

export class AuthDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
