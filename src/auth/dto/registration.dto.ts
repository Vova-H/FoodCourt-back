import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class RegistrationDto {
    @ApiProperty({example: "username", description: "username"})
    @Length(4, 10, {message: "Username length must be min 4 symbols and max 10"})
    @IsNotEmpty({message: "Field can't be empty"})
    readonly username: string

    @ApiProperty({example: "example@gmail.com", description: "uniq email"})
    @IsString()
    @IsEmail({}, {message: "Wrong email type"})
    @IsNotEmpty({message: "Field can't be empty"})
    readonly email: string

    @ApiProperty({example: "00000000", description: "password"})
    @IsNotEmpty({message: "Field can't be empty"})
    @IsString({message: "Password must be string"})
    readonly password: string
}
