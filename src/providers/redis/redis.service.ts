import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  set(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds) {
      return this.redis.set(key, value, 'EX', ttlSeconds);
    }

    return this.redis.set(key, value);
  }

  get(key: string) {
    return this.redis.get(key);
  }

  delete(key: string) {
    return this.redis.del(key);
  }
}
