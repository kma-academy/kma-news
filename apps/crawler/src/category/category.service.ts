import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SlugHelper } from '../common/helpers/slug.helper';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly slugHelper: SlugHelper
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { title } = createCategoryDto;
    const slug = this.slugHelper.slugify(title);
    const data = await this.categoryRepository.save({
      ...createCategoryDto,
      slug,
    });
    return this.categoryRepository.create(data);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const user = await this.categoryRepository.findOne(id);
    if (!user) throw new NotFoundException();
    const data = await this.categoryRepository.save({
      id,
      ...updateCategoryDto,
    });
    return this.categoryRepository.create(data);
  }

  remove(id: number) {
    this.categoryRepository.softDelete(id);
  }
  captalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async findOrCreate(categoryName: string) {
    categoryName = this.captalize(categoryName);
    const existedCategory = await this.categoryRepository.findOne({
      where: {
        slug: this.slugHelper.slugify(categoryName),
      },
    });
    if (existedCategory) return existedCategory;
    return this.create({
      title: categoryName,
      description: '',
    });
  }
}
