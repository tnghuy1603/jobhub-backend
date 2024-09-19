import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, IsIn, IsEnum } from "class-validator";
import { Seniority } from "../entities/job.entity";

export class CreateJobDto {
    @IsNotEmpty()
    jobTitle: string;

    @IsNotEmpty()
    jobDescription: string;

    @IsDateString()
    postedDate: Date

    @IsIn(['Contract', 'Full time', 'Part time', 'Internship', 'Temporary', 'Freelance'])
    employmentType: string;
    @IsNotEmpty()
    @IsString()
    salaryRange: string;

    @IsPositive()
    postFee: number;

    @IsEnum(Seniority)
    seniority: Seniority;

    @IsNumber()
    companyLocationId: number;
}
