import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UsersModel} from "../users/users.model";
import {RolesModel} from "./roles.model";

@Injectable()
export class RolesService {
    constructor(@InjectModel(RolesModel) private roleModel: typeof RolesModel) {
    }

    async getRoleByValue(value) {
        return await RolesModel.findOne({where: {role: value}})
    }

    async createRole(value) {
        return await RolesModel.create(value)
    }

}
