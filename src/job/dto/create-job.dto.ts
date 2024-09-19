import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, IsIn } from "class-validator";

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

    @IsNumber()
    companyLocationId: number;
}
