import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import cheerio, { CheerioAPI } from 'cheerio';
import moment from 'moment';
import { Repository } from 'typeorm';
import { Post, PostStatus } from '../../post/entities/post.entity';
import { firstValueFrom } from 'rxjs';
import { OmitType, PartialType } from '@nestjs/swagger';
import { ParagraphDto } from '../../post/dto/paragraph.dto';
import { ParagraphType } from '../../post/entities/paragraph.entity';
export class PostRaw extends PartialType(
  OmitType(Post, ['categories', 'paragraphs', 'publisher'])
) {
  categories: string[];
  paragraphs: ParagraphDto[];
  publisherHostname: string;
}
@Injectable()
export abstract class BaseHandler {
  protected timeFormat: string;
  protected hostname: string;
  constructor(
    hostname: string,
    timeFormat = 'ddd, DD/MM/YYYY, HH:mm (Z)',
    protected readonly postRepository: Repository<Post>,
    protected readonly httpService: HttpService
  ) {
    this.hostname = hostname;
    this.timeFormat = timeFormat;
  }

  abstract getTitle($: CheerioAPI): string;
  abstract getDescription($: CheerioAPI): string;
  abstract getKeywords($: CheerioAPI): Array<string>;
  abstract getParagraphs($: CheerioAPI): Array<ParagraphDto>;
  abstract getCategories($: CheerioAPI): Array<string>;
  abstract getOwner($: CheerioAPI): string;
  abstract getTimeString($: CheerioAPI): string;
  formatText(text: string) {
    if(!text) return ""
    return text.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
  }
  formatTime(time = 'Thứ ba, 21/12/2021, 08:32 (GMT+7)') {
    try {
      const date = moment(time, this.timeFormat);
      if (!date.isValid()) return new Date();
      return date.toDate();
    } catch (error) {
      return new Date();
    }
  }
  async getNewContent(url: string) {
    const { data } = await firstValueFrom(this.httpService.get(url));
    return cheerio.load(data);
  }
  async getNewDetail(url: string): Promise<PostRaw | undefined> {
    if (typeof url !== 'string' || !this.formatText(url)) return undefined;
    const countPostSameSource = await this.postRepository.count({
      where: {
        sourceURL: url,
      },
    });
    if (countPostSameSource > 0) return undefined;
    const $ = await this.getNewContent(url);
    const post = new PostRaw({});
    post.publisherHostname = this.hostname;
    post.sourceURL = url;
    post.title = this.getTitle($);
    post.description = this.getDescription($);
    post.categories = this.getCategories($);
    post.keywords = this.getKeywords($);
    post.owner = this.getOwner($);
    const timeString = this.getTimeString($);
    post.publishedAt = this.formatTime(timeString) || new Date();
    post.status = PostStatus.PUBLISHED;
    post.paragraphs = this.getParagraphs($);
    const firstImage = post.paragraphs.find(
      (e) => e.type === ParagraphType.IMAGE
    );
    post.thumbnailURL = firstImage?.imageURL[0] || '';
    return post;
  }
}
