import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UsersModel} from "../users/users.model";
import * as bcrypt from "bcryptjs"
import {InjectModel} from "@nestjs/sequelize";
import {LoginDto} from "./dto/login.dto";
import {AvatarsService} from "../avatars/avatars.service";
import * as fs from "fs";
import {TranslationService} from "../translation/translation.service";

@Injectable()
export class AuthService {

    constructor(@InjectModel(UsersModel)
                private userModel: typeof UsersModel,
                private userService: UsersService,
                private jwtService: JwtService,
                private avatarService: AvatarsService,
                private translationService: TranslationService
    ) {
    }

    async login(dto: LoginDto, lang) {
        const user = await this.userModel.findOne({where: {email: dto.email}, include: {all: true}})
        if (!user) {
            throw new HttpException({message: await this.translationService.translateText("The are no users with such email", `${lang}`)}, HttpStatus.NOT_FOUND)
        }
        const passwordsCompare = await bcrypt.compare(dto.password, user.password)
        if (passwordsCompare) {
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles,
                discount_is_using: user.discount_is_using
            }
            return {
                token: this.jwtService.sign(payload),
            }
        }
        throw new HttpException({message: await this.translationService.translateText("Wrong password or email", `${lang}`)}, HttpStatus.BAD_REQUEST)
    }

    async registration(dto, lang) {
        const dtoEmail = dto.email
        const candidate = await UsersModel.findAll({where: {email: dtoEmail}})
        const emptyAvatar = fs.readFileSync(`src/assets/images/emptyAvatar.png`);
        if (candidate.length !== 0) {
            throw new HttpException({message: await this.translationService.translateText("The user with such email is already exist", `${lang}`)}, HttpStatus.CONFLICT)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.createUser({...dto, password: hashedPassword})
        await this.avatarService.createAvatar(emptyAvatar, user.id);
        await user.save()
        throw new HttpException({message: await this.translationService.translateText("The user has been created successfully", `${lang}`)}, HttpStatus.CREATED)
    }
}
