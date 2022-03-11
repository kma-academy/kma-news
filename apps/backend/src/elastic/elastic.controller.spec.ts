import { Test, TestingModule } from '@nestjs/testing';
import { ElasticController } from './elastic.controller';
import { ElasticService } from './elastic.service';

describe('ElasticController', () => {
  let controller: ElasticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElasticController],
      providers: [ElasticService],
    }).compile();

    controller = module.get<ElasticController>(ElasticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
