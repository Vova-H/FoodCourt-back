import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {AvatarsModel} from "./avatarts.model";
import {find} from "rxjs";

@Injectable()
export class AvatarsService {
    constructor(@InjectModel(AvatarsModel)
                private avatarModel: typeof AvatarsModel,
    ) {
    }

    async getAllAvatars() {
        const avatars = await this.avatarModel.findAll()
        const responseAvatars = []
        avatars.map(avatar => {
            responseAvatars.push({
                ...avatar, value: Buffer.from(avatar.value).toString('base64'),
            })
        })
        return responseAvatars

    }

    async createAvatar(value, userId) {
        return this.avatarModel.create({value: value.buffer, userId: userId})
    }

    async changeAvatar(value, userId) {
        const avatar = await AvatarsModel.findOne({where: {userId: userId}})
        await avatar.update({value: value.buffer})
        await avatar.save()
        return {
            avatar: Buffer.from(avatar.value).toString('base64')
        }
    }

}
