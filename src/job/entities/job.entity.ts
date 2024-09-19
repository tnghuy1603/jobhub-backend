import { CompanyLocation } from "src/company-location/entities/company-location.entity";
import { Company } from "src/company/entities/company.entity";
import { Recruiter } from "src/recruiter/entities/recruiter.entity";
import { Column, Entity, PrimaryGeneratedColumn, Check, ManyToOne, JoinColumn } from "typeorm";
export enum Seniority{
    INTERNSHIP = 'Internship',
    FRESHER = 'Fresher',
    ASSOCIATE = 'Associate',
    MIDSENIOR = 'Mid Senior',
    DIRECTOR = 'Director',
    EXECUTIVE = 'Executive'
}
@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number
    @Column({name: 'job_title'})
    jobTitle: string;

    @Column({name: 'job_description'})
    jobDescription: string;

    @Column({name: 'posted_date'})
    postedDate: Date

    @Column({ type: 'varchar', length: 50, name: 'employement_type' })
    @Check(`employment_type IN('Contract', 'Full time', 'Part time', 'Temporary', 'Freelance')`)
    employmentType: string;
    
    @Column({type: 'enum', enum: Seniority})
    seniority: string;
    

    @Column({ type: 'varchar', length: 100, name: 'salary_range' })
    salaryRange: string;

    @Column({ type: 'varchar', length: 20, default: 'Pending' })
    @Check(`status IN('Pending', 'Accepted', 'Rejected')`)
    status: string;

    @Column({ type: 'decimal', name: 'post_fee' })
    @Check('fee_amount > 0')
    postFee: number;
    

    @Column({type: 'int', default: 1})
    version: number;
    @ManyToOne(() => CompanyLocation, company => company.jobs)
    @JoinColumn({name: 'workplace'})
    workplace: CompanyLocation
    
    
}
