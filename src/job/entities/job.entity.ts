import { Enterprise } from "src/enterprise/entities/enterprise.entity";
import { Column, Entity, PrimaryGeneratedColumn, Check, ManyToOne } from "typeorm";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    jobTitle: string;

    @Column()
    jobDescription: string;

    @Column()
    postedDate: Date

    @Column()
    

    @Column({ type: 'varchar', length: 50 })
    @Check(`employment_type IN('Contract', 'Full time', 'Part time', 'Internship', 'Temporary', 'Freelance')`)
    employmentType: string;

    @Column({ type: 'varchar', length: 100 })
    salaryRange: string;

    @Column({ type: 'varchar', length: 20 })
    @Check(`status IN('Pending', 'Accepted', 'Rejected')`)
    status: string;

    @Column({ type: 'decimal' })
    @Check('fee_amount > 0')
    postFee: number;

    @Column({type: 'int', default: 1})
    version: number;
    @ManyToOne(() => Enterprise, enterprise => enterprise.jobs)
    enterprise: Enterprise;
}
