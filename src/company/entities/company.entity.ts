import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "src/job/entities/job.entity";
import { CompanyLocation } from "src/company-location/entities/company-location.entity";
import { Recruiter } from "src/recruiter/entities/recruiter.entity";
export enum CompanyStatus {
    PENDING = 'pending',
    ACTIVATED = 'activated'
}
@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    password: string
    @Column()
    name: string
    @Column()
    address: string
    @Column()
    representative: string
    @Column({unique: true})
    email: string
    @Column({unique: true, nullable: false, name: 'tax_number'})
    taxNumber: string
    @Column({default: CompanyStatus.PENDING, enum: CompanyStatus, type: 'enum'})
    status: string
    @Column()
    industry: string
    @Column({nullable: true})
    website: string
    @Column()
    description: string
    @Column({name: 'found_year'})
    foundYear: number;
    @OneToMany(() => CompanyLocation, companyLocation => companyLocation.company)
    companyLocation: CompanyLocation[]
    @OneToMany(() => Recruiter, recruiter => recruiter.company)
    recruiters: Recruiter[];


}
