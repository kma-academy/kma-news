import { Test, TestingModule } from '@nestjs/testing';
import { ReactPostController } from './react-post.controller';
import { ReactPostService } from './react-post.service';

describe('ReactPostController', () => {
  let controller: ReactPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReactPostController],
      providers: [ReactPostService],
    }).compile();

    controller = module.get<ReactPostController>(ReactPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
