import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticSearchService: ElasticsearchService){}
  async createIndex(index: string, settings: any={}, mappings: any={}){
    const doesExist = this.elasticSearchService.indices.exists({index});
    if(doesExist){
      throw new BadRequestException("Index already exists")
    }
    await this.elasticSearchService.indices.create({index, settings, mappings});
    return {msg: "Index created"}
  }
  async indexDocument(id: string, index: string, document: Record<string, any>){
    return await this.elasticSearchService.index({
      index,
      document,
      id
    });
  }
  async searchDocument(index: string, query: string, field: string){
    
    const {hits} = await this.elasticSearchService.search({
      index, 
      query: {
        match: {
          [field]: query
        }
      }
    })
    return hits.hits;
  };
  async searchMutilFields(index: string, fields: string[], query: string, options: any = {}){
    const {hits} = await this.elasticSearchService.search({
      query: {
        multi_match: {
          query,
          fields,
          ...options
        }
      }
    });
    return hits.hits;
  }
}
