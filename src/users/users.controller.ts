import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UsersModel} from "./users.model";
import {AuthGuard} from "../auth/auth.guard";
import {RolesGuard} from "../permissions/roles.guard";
import {Roles} from "../permissions/roles.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import {RegistrationDto} from "../auth/dto/registration.dto";


@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @Get()
    @ApiOperation({summary: "Getting all users"})
    @ApiResponse({status: 200, type: [UsersModel]})
    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Post()
    @ApiOperation({summary: "Creating new user"})
    @ApiResponse({status: 200, type: UsersModel})
    async createUser(@Body() dto: RegistrationDto) {
        return this.userService.createUser(dto)
    }


    @Post("/add_role")
    @UseGuards(AuthGuard)
    @ApiOperation({summary: "Adding a role"})
    @ApiResponse({status: 200, type: UsersModel})
    async addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }


}
