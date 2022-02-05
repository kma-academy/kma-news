import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), CacheModule.register()],
  exports: [UserService],
})
export class UserModule {}
