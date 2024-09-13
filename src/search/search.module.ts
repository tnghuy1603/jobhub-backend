import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [ElasticsearchModule.register({
    node: 'http://localhost:9200'
  })],
  exports: [ElasticsearchModule, SearchService]
})
export class SearchModule {}
