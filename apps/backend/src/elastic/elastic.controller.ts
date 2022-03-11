import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ElasticService } from './elastic.service';

@Controller()
@ApiTags('admin')
export class ElasticController {
  constructor(private readonly elasticService: ElasticService) {}

  @Post('migrate/post')
  migratePost(){
    return this.elasticService.migratePost()
  }
}
