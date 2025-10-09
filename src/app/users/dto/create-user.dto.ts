import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 50)
  name: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @Length(4, 50)
  password: string;
}
