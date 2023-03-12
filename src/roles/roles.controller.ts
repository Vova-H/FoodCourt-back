import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RolesModel} from "./roles.model";

@ApiTags("Roles")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {
    }

    @Get("/:value")
    @ApiOperation({summary: "Getting role"})
    @ApiResponse({status: 200, type: [RolesModel]})
    async getRoleByValue(@Param("value") role: string) {
        return this.roleService.getRoleByValue(role)
    }


    @Post()
    @ApiOperation({summary: "Create role"})
    @ApiResponse({status: 200, type: [RolesModel]})
    async createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }
}
