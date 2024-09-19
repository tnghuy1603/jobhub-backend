import { Company } from "src/company/entities/company.entity";
import { Interview } from "src/interview/entities/interview.entity";
import { Job } from "src/job/entities/job.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CompanyLocation {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    address: string
    @Column({name: 'postal_code'})
    postalCode: string;
    @Column()
    country: string;
    @ManyToOne(() => Company, company => company.companyLocation)
    @JoinColumn({name: 'company_id'})
    company: Company
    @OneToMany(() => Job, job => job.workplace)
    jobs: Job[]
    @OneToMany(() => Interview, interview => interview.companyLocation, {cascade: true})
    interviews: Interview[]
    @Column({name: 'is_deleted', default: false})
    isDeleted: boolean
    
}
