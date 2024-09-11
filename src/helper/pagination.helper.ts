import { Repository } from "typeorm";

export class PaginationHelper{
    static async paginate<T>(repo: Repository<T>, conditions: any,  page: number, limit: number){
        const [data, total] = await repo.findAndCount({
            where: conditions,
            take: limit,
            skip: (page-1)*limit
        })
        const totalPages = Math.ceil(total/limit);
        const hasNext = page < totalPages;
        const hasPrevious = page < 1;
        return {
            data, limit, page, totalPages, total, hasNext, hasPrevious
        }
    }
}