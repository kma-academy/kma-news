import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertOptionDto } from './dto/upsert-option.dto';
import { Option, OptionType } from './entities/option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>
  ) {}

  findAll() {
    return this.optionRepository.find();
  }

  upsert(name: string, upsertOptionDto: UpsertOptionDto) {
    const { value, type } = upsertOptionDto;
    return this.optionRepository.save({
      name,
      type,
      value: type === OptionType.JSON_TEXT ? JSON.stringify(value) : value,
    });
  }

  async findOne(name: string) {
    const data = await this.optionRepository.findOne(name);
    if (!data) throw new NotFoundException();
    if (data.type === OptionType.PLAIN_TEXT) {
      return data;
    }
    if (data.type === OptionType.JSON_TEXT) {
      return {
        ...data,
        value: JSON.parse(data.value),
      };
    }
  }
}
