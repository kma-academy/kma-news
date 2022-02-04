import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheerioAPI } from 'cheerio';
import moment from 'moment';
import { Repository } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
export interface Paragraph {
  type: 'image' | 'txt';
}
@Injectable()
export abstract class BaseHandler {
  protected timeFormat: string;
  protected hostname: string;
  constructor(
    hostname: string,
    timeFormat = 'DD/MM/YYYY, HH:mm (Z)',
    @InjectRepository(Post)
    protected readonly postRepository: Repository<Post>
  ) {
    this.hostname = hostname;
    this.timeFormat = timeFormat;
  }
  protected abstract getLastedNews(): Promise<string[]>;

  protected abstract getTitle($: CheerioAPI): string;
  protected abstract getDescription($: CheerioAPI): string;
  protected abstract getKeywords($: CheerioAPI): Array<string>;
  protected abstract getParagraphs($: CheerioAPI): Array<Paragraph>;
  protected abstract getCategories($: CheerioAPI): Array<string>;
  protected abstract getOwner($: CheerioAPI): string;
  protected abstract getTimeString($: CheerioAPI): string;
  protected formatText(text: string) {
    return text.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
  }
  protected formatTime(time = 'Thứ ba, 21/12/2021, 08:32 (GMT+7)') {
    const date = moment(time, this.timeFormat);
    return date.toDate();
  }
  async getNewDetail(url: string): Promise<Post> {
    const post = new Post({});
    post.publisherHostname = this.hostname;
    return post;
  }
}
