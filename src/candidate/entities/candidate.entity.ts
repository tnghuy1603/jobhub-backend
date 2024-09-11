import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({nullable: false})
    contactNumber: string

    @Column({nullable: true})
    resume: string

    @Column({nullable: false})
    address: string
    
}
