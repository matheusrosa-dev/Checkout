import { Controller, Get } from '@nestjs/common';
import { MeService } from './me.service';
import { CurrentSession } from '../../decorators';
import type { ISession } from '../auth/types';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { MeDto } from './dtos';

@Controller('me')
@Serialize(MeDto)
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  findOne(@CurrentSession() session: ISession) {
    return this.meService.findMe(session.userId);
  }
}
