import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginFormData {
    @IsEmail()
    @IsNotEmpty({message:"Email is required"})
    login_id: string

    @IsNotEmpty({message:"Password is required"})
    login_password: string

}