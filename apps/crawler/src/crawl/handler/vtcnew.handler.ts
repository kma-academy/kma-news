import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheerioAPI } from 'cheerio';
import { Repository } from 'typeorm';
import { ParagraphDto } from '../../post/dto/paragraph.dto';
import { ParagraphType } from '../../post/entities/paragraph.entity';
import { Post } from '../../post/entities/post.entity';
import { BaseHandler } from './base.handler';

@Injectable()
export class VTCNewHandler extends BaseHandler {
  getTitle($: CheerioAPI): string {
    return this.formatText($('.nd-detail .mb5 .font28').text());
  }
  getDescription($: CheerioAPI): string {
    return this.formatText($('h2.inline-nb').text());
  }
  getKeywords($: CheerioAPI): string[] {
    const keywords = [...$('.keylink li a')].map((e) =>
      this.formatText($(e).text())
    );
    return keywords;
  }
  getParagraphs($: CheerioAPI): ParagraphDto[] {
    const paragraphs: ParagraphDto[] = [];
    const content = [...$('[itemprop="articleBody"]').children()];
    content.forEach((el) => {
      const elem = $(el);
      if (el.tagName == 'p') {
        const content = this.formatText(elem.text());
        if (!content) return;
        paragraphs.push({
          type: ParagraphType.TEXT,
          content,
          imageURL: [],
        });
      }
      if (el.tagName == 'figure') {
        const imageUrl = elem.find('img').attr('data-src');
        const imageDescription = elem.find('figcaption p').text();
        if (!imageUrl) return;
        paragraphs.push({
          type: ParagraphType.IMAGE,
          imageURL: [imageUrl],
          content: this.formatText(imageDescription),
        });
      }
    });
    return paragraphs;
  }
  getCategories($: CheerioAPI): string[] {
    return [...$('.nd-detail').find('.mt-category')].map((e) =>
      this.formatText($(e).text())
    );
  }
  getOwner($: CheerioAPI): string {
    return this.formatText($('.author-make').last().text());
  }
  getTimeString($: CheerioAPI): string {
    const [, timeString] = this.formatText(
      $('.nd-detail .time-update').first().text()
    ).split(',');
    return this.formatText(timeString);
  }
  constructor(
    @InjectRepository(Post)
    protected readonly postRepository: Repository<Post>,
    protected readonly httpService: HttpService
  ) {
    super('vtc.vn', 'DD/MM/YYYY, HH:mm Z', postRepository, httpService);
  }
}
