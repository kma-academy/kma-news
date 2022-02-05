import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import cheerio, { CheerioAPI } from 'cheerio';
import moment from 'moment';
import { Repository } from 'typeorm';
import { Post, PostStatus } from '../../post/entities/post.entity';
import { firstValueFrom } from 'rxjs';
import { OmitType, PartialType } from '@nestjs/swagger';
import { ParagraphDto } from '../../post/dto/paragraph.dto';
class PostRaw extends PartialType(
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

  protected abstract getTitle($: CheerioAPI): string;
  protected abstract getDescription($: CheerioAPI): string;
  protected abstract getKeywords($: CheerioAPI): Array<string>;
  protected abstract getParagraphs($: CheerioAPI): Array<ParagraphDto>;
  protected abstract getCategories($: CheerioAPI): Array<string>;
  protected abstract getOwner($: CheerioAPI): string;
  protected abstract getTimeString($: CheerioAPI): string;
  protected formatText(text: string) {
    return text.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
  }
  protected formatTime(time = 'Thứ ba, 21/12/2021, 08:32 (GMT+7)') {
    try {
      const date = moment(time, this.timeFormat, 'vi', false);
      return date.toDate();
    } catch (error) {
      return new Date();
    }
  }
  async getNewDetail(url: string): Promise<PostRaw | undefined> {
    if (typeof url !== 'string' || !this.formatText(url)) return undefined;
    const countPostSameSource = await this.postRepository.count({
      where: {
        sourceURL: url,
      },
    });
    if (countPostSameSource > 0) return undefined;
    const { data } = await firstValueFrom(this.httpService.get(url));
    const $ = cheerio.load(data);
    const post = new PostRaw({});
    post.publisherHostname = this.hostname;
    post.sourceURL = url;
    post.title = this.getTitle($);
    post.description = this.getDescription($);
    post.categories = this.getCategories($);
    post.keywords = this.getKeywords($);
    post.owner = this.getOwner($);
    const timeString = this.getTimeString($);
    post.publishedAt = this.formatTime(timeString);
    post.status = PostStatus.PUBLISHED;
    // console.log(post.publishedAt);
    post.paragraphs = this.getParagraphs($);
    return post;
  }
}
