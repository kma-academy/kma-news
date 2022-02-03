import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CrawlService {
  constructor(@Inject('VNEXPRESS_CRAWLER') private readonly alo: string) {
    console.log(alo);
  }
}
