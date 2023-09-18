import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UsersModel} from "./users.model";
import {AuthGuard} from "../auth/auth.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {RegistrationDto} from "../auth/dto/registration.dto";
import {Roles} from "../permissions/roles.decorator";
import {RolesGuard} from "../permissions/roles.guard";


@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @Post()
    @ApiOperation({summary: "Getting all users"})
    @ApiResponse({status: 200, type: [UsersModel]})
    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async getAllUsers(@Query('words') words: string) {
        return this.userService.getAllUsers(words)
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    @ApiOperation({summary: "Getting user by id"})
    async getUserById(@Param('id') id) {
        return await this.userService.getUserById(id)
    }

    @Post()
    @ApiOperation({summary: "Creating new user"})
    @ApiResponse({status: 200, type: UsersModel})
    async createUser(@Body() dto: RegistrationDto) {
        return this.userService.createUser(dto)
    }

    @Post("/add_role")
    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: "Adding a role"})
    @ApiResponse({status: 200, type: UsersModel})
    async addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }

    @Post("/delete_role")
    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @ApiOperation({summary: "Deleting a role"})
    @ApiResponse({status: 200, type: UsersModel})
    async deleteRole(@Body() dto: AddRoleDto) {
        return this.userService.deleteRole(dto)
    }

    @Post("/use_discount/:id")
    async changeDiscountStatus(@Param('id') id: number) {
        return this.userService.changeDiscountStatus(id)
    }

}
