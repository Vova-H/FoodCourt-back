import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class AddRoleDto {

    @IsNotEmpty({message: "Field can't be empty"})
    @IsNumber({}, {message: "Role must be number type"})
    readonly userId: string


    @IsNotEmpty({message: "Field can't be empty"})
    @IsString({message: "Role must be string type"})
    readonly role: string

}
