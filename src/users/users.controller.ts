import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthGuard} from "../auth/auth.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {RegistrationDto} from "../auth/dto/registration.dto";
import {Roles} from "../permissions/roles.decorator";
import {RolesGuard} from "../permissions/roles.guard";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @Post()
    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async getAllUsers(@Query('words') words: string) {
        return this.userService.getAllUsers(words)
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    async getUserById(@Param('id') id, @Query("lang") lang) {
        return await this.userService.getUserById(id, lang)
    }

    @Post()
    async createUser(@Body() dto: RegistrationDto) {
        return this.userService.createUser(dto)
    }

    @Post("/add_role")
    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async addRole(@Body() dto: AddRoleDto, @Query("lang") lang) {
        return this.userService.addRole(dto, lang)
    }

    @Post("/delete_role")
    @UseGuards(AuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    async deleteRole(@Body() dto: AddRoleDto, @Query("lang") lang) {
        return this.userService.deleteRole(dto, lang)
    }

    @Post("/use_discount/:id")
    async changeDiscountStatus(@Param('id') id: number, @Query("lang") lang) {
        return this.userService.changeDiscountStatus(id, lang)
    }

}
