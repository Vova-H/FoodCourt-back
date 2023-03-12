import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class LoginDto {
    @IsNotEmpty({message:"Field can't be empty"})
    @IsEmail({}, {message: "Wrong email type"})
    @ApiProperty({example: "example@gmail.com", description: "email"})
    readonly email: string

    @IsNotEmpty({message:"Field can't be empty"})
    @ApiProperty({example: "00000000", description: "password"})
    readonly password: string
}
