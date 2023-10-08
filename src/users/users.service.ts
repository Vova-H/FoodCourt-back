import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersModel} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {RolesService} from "../roles/roles.service";
import {RolesModel} from "../roles/roles.model";
import {RegistrationDto} from "../auth/dto/registration.dto";
import {UsersRolesModel} from "../pivotTables/users_roles.model";
import {AvatarsModel} from "../avatars/avatarts.model";
import {Op} from "sequelize";
import {TranslationService} from "../translation/translation.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UsersModel)
                private userModel: typeof UsersModel,
                private roleService: RolesService,
                private translationService: TranslationService
    ) {
    }

    async getAllUsers(words: string) {
        const users = await this.userModel.findAll({
            include: [
                {model: RolesModel},
                {model: AvatarsModel}
            ],
            order: [["id", "ASC"]],
            where: {
                [Op.or]: [
                    {username: {[Op.iLike]: `%${words}%`}},
                    {email: {[Op.iLike]: `%${words}%`}},
                    {'$roles.role$': {[Op.iLike]: `%${words}%`}}
                ]
            }
        });

        return users.map(user => {
            let roles = user.roles.map(role => {
                return {
                    id: role.id,
                    role: role.role
                };
            });

            let avatar = Buffer.from(user.avatar.dataValues.value).toString('base64');

            return {
                id: user.id,
                username: user.username,
                email: user.email,
                discount_is_using: user.discount_is_using,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                avatar: avatar,
                roles: roles
            };
        });
    }


    async getUserById(id, lang) {
        const user = await this.userModel.findOne({where: {id: id}, include: {all: true}})
        if (!user) {
            throw new HttpException(await this.translationService.translateText("There are no users with such id", lang), HttpStatus.NOT_FOUND)
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            avatar: Buffer.from(user.avatar.value).toString('base64'),
            orders: user.orders,
            cartItems: user.cartItems,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
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

    async addRole(dto, lang) {
        const userModel = await UsersModel.findOne({where: {id: dto.userId}, include: [{model: RolesModel}]})
        const roleModel = await this.roleService.getRoleByValue(dto.role)
        const userRoleModel = await UsersRolesModel.findOne({where: {userId: userModel.id, roleId: roleModel.id}})
        if (userRoleModel) {
            throw new HttpException(await this.translationService.translateText("The user already has current role", lang), HttpStatus.CONFLICT)
        }
        if (userModel && roleModel) {
            await userModel.$add("role", roleModel.id)
            const userModelRefresh = await UsersModel.findOne({where: {id: dto.userId}, include: [{model: RolesModel}]})
            const rolesModelRefresh = userModelRefresh.roles
            return rolesModelRefresh.map(role => ({
                id: role.id,
                role: role.role
            }));
        } else {
            throw new HttpException(await this.translationService.translateText("The are no such role or user", lang), HttpStatus.NOT_FOUND)
        }
    }

    async deleteRole(dto, lang) {
        const userModel = await UsersModel.findOne({where: {id: dto.userId}, include: [{model: RolesModel}]})
        const roleModel = await this.roleService.getRoleByValue(dto.role)
        if (roleModel.role === "ADMIN") {
            throw new HttpException(await this.translationService.translateText("You can't delete role admin", lang), HttpStatus.FORBIDDEN)
        }
        const userRoleModel = await UsersRolesModel.findOne({where: {userId: userModel.id, roleId: roleModel.id}})
        if (!userRoleModel) {
            throw new HttpException(await this.translationService.translateText("The user does not have this role for delete", lang), HttpStatus.NOT_FOUND)
        } else {
            await UsersRolesModel.destroy({where: {userId: userModel.id, roleId: roleModel.id}})
            const userModelRefresh = await UsersModel.findOne({where: {id: dto.userId}, include: [{model: RolesModel}]})
            const rolesModelRefresh = userModelRefresh.roles
            return rolesModelRefresh.map(role => ({
                id: role.id,
                role: role.role
            }));
        }
    }


    async changeDiscountStatus(user_id: number, lang) {
        const user = await UsersModel.findOne({where: {id: user_id}})
        user.discount_is_using = true
        await user.save()
        throw new HttpException(await this.translationService.translateText("The status of discount was been change successfully", lang), HttpStatus.ACCEPTED)
    }
}
