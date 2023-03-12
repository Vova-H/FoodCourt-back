import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: "userId", description: "User Id"})
    @IsNotEmpty({message: "Field can't be empty"})
    @IsNumber({}, {message: "Role must be number type"})
    readonly userId: string

    @ApiProperty({example: "ADMIN", description: "ADMIN"})
    @IsNotEmpty({message: "Field can't be empty"})
    @IsString({message: "Role must be string type"})
    readonly role: string

}
