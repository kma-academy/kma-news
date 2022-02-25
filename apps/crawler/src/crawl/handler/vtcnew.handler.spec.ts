import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CheerioAPI } from 'cheerio';
import { Post } from '../../post/entities/post.entity';
import { VTCNewHandler } from './vtcnew.handler';

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));
describe('VTCNewsHandler', () => {
  let service: VTCNewHandler;
  let $: CheerioAPI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VTCNewHandler,
        {
          provide: getRepositoryToken(Post),
          useClass: mockRepository,
        },
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<VTCNewHandler>(VTCNewHandler);
    $ = await service.getNewContent(
      'https://vtc.vn/tan-hoang-minh-xin-bo-coc-lo-dat-dau-gia-o-thu-thiem-ar656678.html'
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getTitle', () => {
    const title = service.getTitle($);
    expect(title).toEqual(
      'Tân Hoàng Minh xin bỏ cọc lô đất đấu giá ở Thủ Thiêm'
    );
  });

  it('getDescription', () => {
    const description = service.getDescription($);
    expect(description).toEqual(
      `Ngày 10/1, Chủ tịch Tân Hoàng Minh xin chấm dứt hợp đồng mua bán đấu giá lô đất 24.500 tỷ đồng tại Thủ Thiêm.`
    );
  });

  it('getKeywords', () => {
    const keywords = service.getKeywords($);
    expect(keywords).toEqual([
      'Tân Hoàng Minh',
      'Đỗ Anh Dũng',
      'đấu giá đất thủ thiêm',
    ]);
  });

  it('getParagraphs', () => {
    const paragraphs = service.getParagraphs($);
    expect(paragraphs).toHaveLength(12);
    expect(paragraphs[3].type).toEqual('image');
    expect(paragraphs[3].content).toEqual(
      'Tân Hoàng Minh huỷ hợp đồng lô đất đấu giá tại Thủ Thiêm.'
    );
    expect(paragraphs[3].imageURL).toHaveLength(1);
    expect(paragraphs[11].content).toEqual(
      `“Nếu tôi bỏ cuộc, thì lô đất 3-12 này là lô đất được đánh giá đẹp nhất Thủ Thiêm sẽ thuộc về sở hữu của nhà đầu tư nước ngoài. Trong suy nghĩ của tôi lúc đó trào lên lòng tự hào dân tộc, danh dự của các tập đoàn đầu tư bất động sản trong nước, mà tôi là một trong những số đó. Nên tôi đã quyết tâm trả giá cao hơn 3% (700 tỷ đồng) để giành quyền trúng đấu giá lô đất này”, ông Dũng nhấn mạnh.`
    );
  });

  it('getCategories', () => {
    const categories = service.getCategories($);
    expect(categories).toEqual(['Đầu Tư']);
  });

  it('getOwner', () => {
    const owner = service.getOwner($);
    expect(owner).toEqual('Ngọc Vy');
  });

  it('getTimeString', () => {
    const timeString = service.getTimeString($);
    expect(timeString).toEqual('11/01/2022 18:44:00 +07:00');
    const time = service.formatTime(timeString);
    expect(time.toISOString()).toEqual('2022-01-11T11:44:00.000Z');
  });
});
