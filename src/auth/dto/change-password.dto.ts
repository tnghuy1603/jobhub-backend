import { IsEmail, IsNotEmpty } from "class-validator"

export class ChangePasswordDto{
    @IsNotEmpty()
    oldPwd: string
    @IsNotEmpty()
    newPwd: string
}