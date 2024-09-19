import { IsEnum } from "class-validator";
import { Candidate } from "src/candidate/entities/candidate.entity";
import { Column, Entity, PrimaryGeneratedColumn, Check, JoinColumn, ManyToOne } from "typeorm";
export enum ApplicationStatus{
    SUBMITTED = 'Submitted',
    REVIEWED = 'Reviewed',
    OFFERED = 'Offered',
    REJECTED = 'Rejected',
}

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.SUBMITTED})
    @Check("status IN ('Submitted', 'Reviewed', 'Offered', 'Rejected')")
    status: string;
    @ManyToOne(() => Candidate, candidate => candidate.applications)
    @JoinColumn({name: 'candidate_id'})
    candidate: Candidate;
    
}
