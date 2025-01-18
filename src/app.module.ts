import { Module } from '@nestjs/common';
import { LoggerConfiguredModule } from './lib/Logger';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './module/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    LoggerConfiguredModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
