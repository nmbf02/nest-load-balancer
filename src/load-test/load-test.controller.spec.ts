import { Test, TestingModule } from '@nestjs/testing';
import { LoadTestController } from './load-test.controller';

describe('LoadTestController', () => {
  let controller: LoadTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoadTestController],
    }).compile();

    controller = module.get<LoadTestController>(LoadTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
