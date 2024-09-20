import { Candidate } from "src/candidate/entities/candidate.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({name: 'uploaded_at'})
    @CreateDateColumn({name: 'uploaded_at'})
    uploadedAt: Date;
    @Column({name: 'file_path'})
    filePath: string;
    @Column({name: 'is_default'})
    isDefault: boolean;
    @ManyToOne(() => Candidate, (candidate) => candidate.resumes, { nullable: false, onDelete: 'CASCADE' })
    candidate: Candidate;
}
