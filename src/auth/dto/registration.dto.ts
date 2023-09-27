import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";


export class RegistrationDto {
    @Length(4, 10, {message: "Username length must be min 4 symbols and max 10"})
    @IsNotEmpty({message: "Field can't be empty"})
    readonly username: string

    @IsString()
    @IsEmail({}, {message: "Wrong email type"})
    @IsNotEmpty({message: "Field can't be empty"})
    readonly email: string

    @IsNotEmpty({message: "Field can't be empty"})
    @IsString({message: "Password must be string"})
    readonly password: string
}
