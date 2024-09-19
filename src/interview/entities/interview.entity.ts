// src/interview/entities/interview.entity.ts

import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyLocation } from '../../company-location/entities/company-location.entity';
import { Candidate } from 'src/candidate/entities/candidate.entity';
  
@Entity()
export class Interview {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'job_title'})
    jobTitle: string;

    @Column({ type: 'date', name: 'interview_date' })
    interviewDate: Date;

    @Column('text')
    experience: string;
    @Column()
    difficulty: number;

    @Column('text')
    askedQuestion: string;
    @Column('text')
    outcome: string;

    @ManyToOne(() => Candidate, candiate => candiate.interviews, { eager: true })
    @JoinColumn({ name: 'candidate_id' })
    candidate: Candidate;
    @ManyToOne(() => CompanyLocation, (location) => location.interviews, { eager: true })
    @JoinColumn({ name: 'workplace_id' })
    companyLocation: CompanyLocation;
}
