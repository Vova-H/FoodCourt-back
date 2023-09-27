import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {
    }

    @Get("/:value")
    async getRoleByValue(@Param("value") role: string) {
        return this.roleService.getRoleByValue(role)
    }


    @Post()
    async createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }
}

