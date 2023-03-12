import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: "ADMIN", description: "Role of user"})
    @IsNotEmpty({message: "Field can't be empty"})
    @IsString({message: "Role must be string type"})
    readonly role: string
}
