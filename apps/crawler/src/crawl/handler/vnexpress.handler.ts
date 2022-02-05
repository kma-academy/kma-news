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
export class VNExpressHandler extends BaseHandler {
  constructor(
    @InjectRepository(Post)
    protected readonly postRepository: Repository<Post>,
    protected readonly httpService: HttpService
  ) {
    super(
      'vnexpress.net',
      'ddd, DD/MM/YYYY, HH:mm (Z)',
      postRepository,
      httpService
    );
  }
  getTitle($: CheerioAPI): string {
    return this.formatText($('.title-detail').text());
  }
  getDescription($: CheerioAPI): string {
    return this.formatText($('.description').text());
  }
  getKeywords($: CheerioAPI): string[] {
    const keywordsRaw = $('.tags .item-tag');
    const keywords = [...keywordsRaw].map((e) => this.formatText($(e).text()));
    return keywords;
  }
  getParagraphs($: CheerioAPI): ParagraphDto[] {
    const paragraphs: ParagraphDto[] = [];
    const content = [...$('.fck_detail').children()];
    content.forEach((el) => {
      const elem = $(el);
      // && elem.attr('class') == 'Normal'
      if (el.tagName == 'p' && !elem.attr('style')) {
        const content = this.formatText(elem.text());
        if (!content) return;
        paragraphs.push({
          type: ParagraphType.TEXT,
          content,
          imageURL: [],
        });
      }
      if (el.tagName == 'figure') {
        let imageUrl = elem.find('meta[itemprop="url"]').attr('src');
        const imageDescription = elem
          .find('figcaption[itemprop="description"] p')
          .text();
        if (!imageUrl) {
          const srcSet =
            elem.find('source').attr('data-srcset')?.split(',') || [];
          if (srcSet.length == 0) return;
          imageUrl = srcSet[srcSet.length - 1].trim().split(' ')[0];
        }
        if (!imageUrl) {
          imageUrl =
            elem.find('img').attr('data-src') ||
            elem.find('img').attr('src') ||
            '';
        }
        // if (!imageUrl) return
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
    const categoriesName = [...$('ul.breadcrumb').find('li')].map((e) =>
      this.formatText($(e).text())
    );
    return categoriesName;
  }

  getOwner($: CheerioAPI): string {
    const owner =
      $('p.author_mail').text() ||
      $('p.Normal[style="text-align:right;"]').text();
    return this.formatText(owner);
  }

  getTimeString($: CheerioAPI): string {
    return this.formatText($('span.date').text());
  }
}
