import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlugHelper } from '../common/helpers/slug.helper';
import { Like, Repository } from 'typeorm';
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
    const countSameSlug = await this.categoryRepository.count({
      where: [
        {
          slug: Like(`${slug}-%`),
        },
        {
          slug: slug,
        },
      ],
    });
    const data = await this.categoryRepository.save({
      ...createCategoryDto,
      slug: countSameSlug === 0 ? slug : `${slug}-${countSameSlug + 1}`,
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
    const category = await this.categoryRepository.findOne(id);
    if (!category) throw new NotFoundException();
    const data = await this.categoryRepository.save({
      id,
      ...category,
      ...updateCategoryDto,
    });
    return this.categoryRepository.create(data);
  }

  searchCategory(q: string) {
    return this.categoryRepository.find({
      where: {
        title: Like(`%${q}%`),
      },
      take: 5,
      order: {
        title: 'ASC',
      },
    });
  }

  remove(id: number) {
    this.categoryRepository.softDelete(id);
  }
}
