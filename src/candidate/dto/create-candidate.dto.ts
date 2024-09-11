import { IsDate, IsDateString, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCandidateDto {

    @IsNotEmpty()
    email: string
    
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsDateString()
    dob: Date;

    @IsNotEmpty()
    @IsString()
    bio: string;

    @IsNotEmpty()
    @IsString()
    employmentStatus: string;

    @IsNotEmpty()
    @IsString()
    profilePicture: string;

    @IsNotEmpty()
    @IsString()
    contactNumber: string;


    resume: string;

    @IsNotEmpty()
    @IsString()
    address: string;
}
