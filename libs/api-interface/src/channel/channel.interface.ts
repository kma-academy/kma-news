import { Category } from '../category/category.interface';
import { Publisher } from '../publisher/publisher.interface';
import { User } from '../user/user.interface';

export interface Channel {
  id: number;
  name: string;
  owner: User;
  isPublic: boolean;
  categories: Category[];
  keywords: string[];
  publishers: Publisher[];
  excludedCategories: Category[];
  excludedKeywords: string[];
  excludedPublishers: Publisher[];
}
