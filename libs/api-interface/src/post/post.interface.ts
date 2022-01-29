import { Category } from '../category/category.interface';
import { Publisher } from '../publisher/publisher.interface';

export interface Post {
  id: number;
  sourceURL: string;
  title: string;
  slug: string;
  description: string;
  owner: string;
  status: 'published' | 'pending' | 'draft' | 'trash';
  publishedAt: string;
  keywords: string[];
  viewCount: number;
  publisher: Publisher;
  url: string;
}

export interface PostWithDetail extends Post {
  paragraphs: Array<{
    type: 'image' | 'text';
    content: string;
    imageURL: string[];
  }>;
  categories: Category[];
}
