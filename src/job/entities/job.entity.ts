import { Company } from "src/company/entities/company.entity";
import { Column, Entity, PrimaryGeneratedColumn, Check, ManyToOne } from "typeorm";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    jobTitle: string;

    @Column()
    jobDescription: string;

    @Column({})
    postedDate: Date

    @Column({ type: 'varchar', length: 50 })
    @Check(`employment_type IN('Contract', 'Full time', 'Part time', 'Internship', 'Temporary', 'Freelance')`)
    employmentType: string;

    @Column({ type: 'varchar', length: 100 })
    salaryRange: string;

    @Column({ type: 'varchar', length: 20, default: 'Pending' })
    @Check(`status IN('Pending', 'Accepted', 'Rejected')`)
    status: string;

    @Column({ type: 'decimal' })
    @Check('fee_amount > 0')
    postFee: number;

    @Column({type: 'int', default: 1})
    version: number;
    @ManyToOne(() => Company, company => company.jobs)
    company: Company
}
