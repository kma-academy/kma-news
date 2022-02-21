import { Test, TestingModule } from '@nestjs/testing';
import { ReactPostService } from './react-post.service';

describe('ReactPostService', () => {
  let service: ReactPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactPostService],
    }).compile();

    service = module.get<ReactPostService>(ReactPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
