/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { CheerioAPI } from 'cheerio';
import { Repository } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { BaseHandler } from './base.handler';
import { ParagraphDto } from '../../post/dto/paragraph.dto';
import { ParagraphType } from '../../post/entities/paragraph.entity';

@Injectable()
export class VietNamNetHandler extends BaseHandler {
  constructor(
    @InjectRepository(Post)
    protected readonly postRepository: Repository<Post>,
    protected readonly httpService: HttpService
  ) {
    super('vietnamnet.vn', 'DD/MM/YYYY hh:mm', postRepository, httpService);
  }
  getTitle($: CheerioAPI): string {
    return this.formatText($('.ArticleDetail > h1').text());
  }
  getDescription($: CheerioAPI): string {
    return this.formatText($('#ArticleContent > .ArticleLead > p').text());
  }
  getKeywords($: CheerioAPI): string[] {
    const keywords = [...$('.tagBoxContent .clearfix li a')].map((e) =>
      this.formatText($(e).text())
    );
    return keywords;
  }
  getParagraphs($: CheerioAPI): ParagraphDto[] {
    const paragraphs: ParagraphDto[] = [];
    const content = [...$('.ArticleContent').children()];
    content.forEach((el) => {
      const elem = $(el);

      if (el.tagName == 'p' && elem.children().length == 0) {
        const content = this.formatText(elem.text());
        if (!content) return;
        paragraphs.push({
          type: ParagraphType.TEXT,
          content,
          imageURL: [],
        });
      }
      if (el.tagName == 'table') {
        const imageURL = elem.find('img').attr('src');
        const imageDescription = elem.find('td.image_desc').text();
        if (!imageURL) return;
        paragraphs.push({
          type: ParagraphType.IMAGE,
          imageURL: [imageURL],
          content: this.formatText(imageDescription),
        });
      }
    });
    return paragraphs;
  }

  getCategories($: CheerioAPI): string[] {
    const categoriesName = [...$('ul.breadcrumb').find('li')].map((e) =>
      this.formatText($(e).text())
    );
    return categoriesName;
  }

  getOwner($: CheerioAPI): string {
    const owner = $('#ArticleContent > p > strong').first().text();
    return this.formatText(owner);
  }

  getTimeString($: CheerioAPI): string {
    return this.formatText($('span.date').text());
  }
}
