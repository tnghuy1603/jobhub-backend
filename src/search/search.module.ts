import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [SearchService],
  imports: [ConfigModule, 
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      auth: {
        username: 'root',
        password: 'Letmein123'
      }
    })
  ],

  exports: [SearchService]
})
export class SearchModule {}
