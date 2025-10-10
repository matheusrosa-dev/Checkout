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
import type { ISession } from './types';
import { CurrentSession, Public } from '../../decorators';
import { RefreshTokenGuard } from '../../guards';

@Controller('auth')
@Serialize(AuthDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Public()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-session')
  @Public()
  @UseGuards(RefreshTokenGuard)
  refreshSession(@Req() req: { userId: string }) {
    return this.authService.refreshSession(req.userId);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@CurrentSession() session: ISession) {
    return this.authService.logout(session.userId);
  }
}
