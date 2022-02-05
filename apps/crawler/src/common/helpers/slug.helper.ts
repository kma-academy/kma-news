import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugHelper {
  slugify(text: string) {
    let slug = text.toLowerCase();
    slug = slug
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
    slug = slug.replace(/\s/g, '-').replace(/[^\w-]+/g, '');
    slug = slug.replace(/(\-)+/gi, '-');
    slug = slug.replace(/^\-|\-$/gi, '');
    return slug;
  }
}
