import { CheerioAPI } from 'cheerio';
export interface Paragraph {
  type: 'image' | 'txt';
}
export abstract class BaseHandler {
  private timeFormat: string;
  private hostname: string;
  constructor(hostname: string, timeFormat = 'DD/MM/YYYY, HH:mm (Z)') {
    this.hostname = hostname;
    this.timeFormat = timeFormat;
  }
  abstract getLastedNews(): Promise<string[]>;

  abstract getTitle($: CheerioAPI): string;
  abstract getDescription($: CheerioAPI): string;
  abstract getKeywords($: CheerioAPI): Array<string>;
  // abstract getParagraphs($: CheerioAPI): Array<IParagraph>;
  // abstract getCategories($: CheerioAPI): Promise<MongoObjectId[]>;
  abstract getOwner($: CheerioAPI): string;
  abstract getTimeString($: CheerioAPI): string;
}
