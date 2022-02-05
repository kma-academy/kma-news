import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}
  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
  findOneByRole(role: UserRole) {
    return this.userRepository.findOne(
      {
        role,
      },
      {
        order: {
          id: 'ASC',
        },
      }
    );
  }
}
