import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { LoginDto, AuthDto, RegisterDto } from './dtos';
import type { ISession } from './types';
import { CurrentSession, Public } from '../../decorators';
import { RefreshTokenGuard } from '../../guards';
import type { Response } from 'express';

@Controller('auth')
@Serialize(AuthDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const tokens = await this.authService.register(registerDto);

    this.setAuthTokensCookie({ res, tokens });

    return res.send();
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);

    this.setAuthTokensCookie({ res, tokens });

    return res.send();
  }

  @Post('refresh-session')
  @Public()
  @UseGuards(RefreshTokenGuard)
  async refreshSession(@Req() req: { userId: string }, @Res() res: Response) {
    const tokens = await this.authService.refreshSession(req.userId);

    this.setAuthTokensCookie({ res, tokens });
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentSession() session: ISession, @Res() res: Response) {
    await this.authService.logout(session.userId);

    this.destroyAuthTokensCookie(res);

    return res.send();
  }

  setAuthTokensCookie(props: {
    res: Response;
    tokens: { accessToken: string; refreshToken: string };
  }) {
    const { res, tokens } = props;

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
    });

    return res.send();
  }

  destroyAuthTokensCookie(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
