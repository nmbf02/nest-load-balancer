import { Controller, Get } from '@nestjs/common';

@Controller('api/load-test')
export class LoadTestController {
  @Get()
  handleLoadTest(): string {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
      sum += i;
    }
    return `Processed Load Test: ${sum}`;
  }
}
