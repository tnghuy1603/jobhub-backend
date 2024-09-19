import { Exclude } from "class-transformer";
import { CompanyLocation } from "src/company-location/entities/company-location.entity";
import { Company } from "src/company/entities/company.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, } from "typeorm";

@Entity()
export class Recruiter {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    phone: string;
    @Column({ nullable: true })
    position: string;
    @Column({nullable: false})
    @Exclude()
    password: string;

    @ManyToOne(() => Company, company => company.recruiters, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'company_id'})
    company: Company;

    @Column({ default: true })
    isActive: boolean;
}
