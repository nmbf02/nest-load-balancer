import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoadTestController } from './load-test/load-test.controller';

@Module({
  imports: [],
  controllers: [AppController, LoadTestController],
  providers: [AppService],
})
export class AppModule {}
