import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser)
      throw new ConflictException('Email is used by another one');

    return await this.userRepository.save({
      ...createUserDto,
      password: this.hashPassword(createUserDto.password),
    });
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async findOneFromCache(id: number) {
    const userRaw = (await this.cacheManager.get(`user:${id}`)) as string;
    if (userRaw) {
      const user = this.userRepository.create(JSON.parse(userRaw));
      return user;
    }
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException();
    await this.cacheManager.set(`user:${id}`, JSON.stringify(user), {
      ttl: 300,
    });
    return user;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    if (updateUserDto.password) {
      updateUserDto.password = this.hashPassword(updateUserDto.password);
    }
    return await this.userRepository.save({ id, ...updateUserDto });
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  comparePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}
