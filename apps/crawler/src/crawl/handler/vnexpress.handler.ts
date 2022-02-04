/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheerioAPI } from 'cheerio';
import { Repository } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { BaseHandler, Paragraph } from './base.handler';

@Injectable()
export class VNExpressHandler extends BaseHandler {
  constructor(
    @InjectRepository(Post)
    protected readonly postRepository: Repository<Post>
  ) {
    super('vnexpress.net', '', postRepository);
  }
  protected getLastedNews(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  protected getTitle($: CheerioAPI): string {
    throw new Error('Method not implemented.');
  }
  protected getDescription($: CheerioAPI): string {
    throw new Error('Method not implemented.');
  }
  protected getKeywords($: CheerioAPI): string[] {
    throw new Error('Method not implemented.');
  }
  protected getParagraphs($: CheerioAPI): Paragraph[] {
    throw new Error('Method not implemented.');
  }
  protected getCategories($: CheerioAPI): string[] {
    throw new Error('Method not implemented.');
  }
  protected getOwner($: CheerioAPI): string {
    throw new Error('Method not implemented.');
  }
  protected getTimeString($: CheerioAPI): string {
    throw new Error('Method not implemented.');
  }
}
