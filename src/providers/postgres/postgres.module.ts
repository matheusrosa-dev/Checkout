import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../../config/config.module';
import { IDatabaseConfig } from '../../config/interfaces';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const database = configService.get('database') as IDatabaseConfig;

        const isSeeding = process.env.NODE_ENV === 'seed';

        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.user,
          password: database.password,
          database: database.name,
          entities: [
            isSeeding
              ? 'src/**/*.entity{.ts,.js}'
              : 'dist/**/*.entity{.ts,.js}',
          ],
          synchronize: true,
        };
      },
    }),
  ],
})
export class PostgresModule {}
