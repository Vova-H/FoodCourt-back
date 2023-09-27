import {IsNotEmpty, IsString} from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty({message: "Field can't be empty"})
    @IsString({message: "Role must be string type"})
    readonly role: string
}
