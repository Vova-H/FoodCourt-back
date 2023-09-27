import {IsEmail, IsNotEmpty} from "class-validator";

export class LoginDto {
    @IsNotEmpty({message:"Field can't be empty"})
    @IsEmail({}, {message: "Wrong email type"})
    readonly email: string

    @IsNotEmpty({message:"Field can't be empty"})
    readonly password: string
}
