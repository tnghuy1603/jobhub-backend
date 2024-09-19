import { IsEmail, IsInt, isNotEmpty, IsNotEmpty, IsOptional, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreateCompanyDto {
    @IsNotEmpty()
    @MinLength(6, {message: "Password must be longer than 6 characters"})
    password: string;
    @IsNotEmpty()
    @IsString()
    companyName: string;
    @IsNotEmpty()
    taxNumber: string;
    @IsNotEmpty()
    representative: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    industry: string;
    @IsOptional()
    website?: string;
    @IsPositive()
    @IsInt()
    foundYear: number;
    @IsNotEmpty()
    description: string;
}
