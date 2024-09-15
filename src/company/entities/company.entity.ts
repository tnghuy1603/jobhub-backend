import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "src/job/entities/job.entity";
export enum CompanyStatus {
    PENDING = 'pending',
    ACTIVATED = 'activated'
}
@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    username: string
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
    @Column({unique: true, nullable: false})
    taxNumber: string
    @Column({default: false})
    potential: boolean
    @Column({default: CompanyStatus.PENDING, enum: CompanyStatus, type: 'enum'})
    status: string
    @Column()
    industry: string
    @Column({nullable: true})
    website: string
    @Column()
    description: string
    @Column()
    foundYear: number;
    @OneToMany(() => Job, job => job.company)
    jobs: Job[];

}
