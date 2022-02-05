import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>
  ) {}
  async create(createPublisherDto: CreatePublisherDto) {
    const publisher = await this.publisherRepository.findOne(
      createPublisherDto.hostname
    );
    if (publisher) throw new BadRequestException('Dupicate publisher hostname');
    const data = await this.publisherRepository.save(createPublisherDto);
    return this.publisherRepository.create(data);
  }

  findAll() {
    return this.publisherRepository.find();
  }

  findOne(hostname: string) {
    return this.publisherRepository.findOne(hostname);
  }

  async update(hostname: string, updatePublisherDto: UpdatePublisherDto) {
    const data = await this.publisherRepository.save({
      hostname,
      ...updatePublisherDto,
    });
    return this.publisherRepository.create(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(hostname: string) {
    throw new NotAcceptableException();
  }
}
