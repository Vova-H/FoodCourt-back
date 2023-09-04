import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersModel} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {RolesService} from "../roles/roles.service";
import {RolesModel} from "../roles/roles.model";
import {RegistrationDto} from "../auth/dto/registration.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UsersModel)
                private userModel: typeof UsersModel,
                private roleService: RolesService
    ) {
    }

    async getAllUsers() {
        return await this.userModel.findAll({include: {all: true}})
    }

    async getUserById(id) {
        const user = await this.userModel.findOne({where: {id: id}, include: {all: true}})
        if (!user) {
            throw new HttpException("There are no users with such id", HttpStatus.BAD_REQUEST)
        }
        return {
            username: user.username,
            email: user.email,
            roles: user.roles,
            avatar: Buffer.from(user.avatar.value).toString('base64'),
            orders: user.orders,
            cartItems: user.cartItems
        }
    }


    async createUser(dto: RegistrationDto) {
        const user = await UsersModel.create(dto)
        const role = await this.roleService.getRoleByValue("USER")
        await user.$add('roles', [role.id])
        user.roles = [role]
        await user.save()
        return user
    }

    async addRole(dto) {
        const user = await UsersModel.findOne({where: {id: dto.userId}, include: [{model: RolesModel}]})
        const role = await this.roleService.getRoleByValue(dto.role)
        if (user && role) {
            await user.$add("role", (await role).id)
            throw new HttpException("The role was added successfully", HttpStatus.ACCEPTED)
        }else {
            throw new HttpException("The are no such role or user", HttpStatus.ACCEPTED)
        }
    }

    async changeDiscountStatus(user_id: number) {
        const user = await UsersModel.findOne({where: {id: user_id}})
        user.discount_is_using = true
        await user.save()
        throw new HttpException("The status of discount was been change successfully", HttpStatus.ACCEPTED)
    }
}
