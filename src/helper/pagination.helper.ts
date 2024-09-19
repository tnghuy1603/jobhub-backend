import { Repository, SelectQueryBuilder } from "typeorm";

export class PaginationHelper{
    static async paginate<T>(repo: Repository<T>, conditions: any,  page: number, limit: number, order: string, relations: string[]){
        const skip = (page-1)*limit;
        let criteria: any = {take: limit, skip: skip};
        if(order){
            criteria = {...criteria, order};
        }
        if(relations){
            criteria = {...criteria, relations};
        }
        const [data, total] = await repo.findAndCount(criteria);
        const totalPages = Math.ceil(total/limit);
        const hasNext = page < totalPages;
        const hasPrevious = page < 1;
        return {
            data, limit, page, totalPages, total, hasNext, hasPrevious
        }
    }
    
}