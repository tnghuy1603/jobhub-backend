import { Application } from "src/application/entities/application.entity";
import { Interview } from "src/interview/entities/interview.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    fullName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    dob: Date

    @Column({nullable: true})
    bio: string

    @Column({name: 'employment_status'})
    employmentStatus: string

    @Column({name: 'profile_picture', nullable: true})
    profilePicture: string

    @Column({nullable: false, name: 'contact_number'})
    contactNumber: string

    @Column({nullable: true})
    resume: string

    @Column({nullable: false})
    address: string
    @OneToMany(() => Interview, interview => interview.candidate)
    interviews: Interview[]
    @OneToMany(() => Application, application => application.candidate)
    applications: Application[];
    
}
