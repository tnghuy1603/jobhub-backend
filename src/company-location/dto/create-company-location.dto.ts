import { IsNotEmpty } from "class-validator";

export class CreateCompanyLocationDto {
    @IsNotEmpty()
    address: string;
    postalCode: string;
    companyId: number;
    country: string;
}
