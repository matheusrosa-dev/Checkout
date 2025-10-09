import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { LoginDto, AuthDto, RegisterDto } from './dtos';
import { CurrentSession, AuthGuard } from '../../common/decorators';
import type { ISession } from './types';
import { RefreshTokenGuard } from './guards';

@Controller('auth')
@Serialize(AuthDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-session')
  @UseGuards(RefreshTokenGuard)
  refreshSession(@Req() req: { userId: string }) {
    return this.authService.refreshSession(req.userId);
  }

  @Post('logout')
  @AuthGuard()
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@CurrentSession() session: ISession) {
    return this.authService.logout(session.userId);
  }
}
