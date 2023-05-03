import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UsersModel} from "../users/users.model";
import * as bcrypt from "bcryptjs"
import {InjectModel} from "@nestjs/sequelize";
import {LoginDto} from "./dto/login.dto";
import {AvatarsService} from "../avatars/avatars.service";
import * as fs from "fs";

@Injectable()
export class AuthService {

    constructor(@InjectModel(UsersModel)
                private userModel: typeof UsersModel,
                private userService: UsersService,
                private jwtService: JwtService,
                private avatarService: AvatarsService
    ) {
    }

    async login(dto: LoginDto) {
        const user = await this.userModel.findOne({where: {email: dto.email}, include: {all: true}})
        if (!user) {
            throw new UnauthorizedException({message: "The are no users with such email"})
        }
        const passwordsCompare = await bcrypt.compare(dto.password, user.password)
        if (passwordsCompare) {
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles
            }
            return {
                token: this.jwtService.sign(payload)
            }
        }
        throw new UnauthorizedException({message: "Wrong password or email"})
    }

    async registration(dto) {
        const dtoEmail = dto.email
        const candidate = await UsersModel.findAll({where: {email: dtoEmail}})
        const emptyAvatar = fs.readFileSync(`src/assets/images/emptyAvatar.png`);
        if (candidate.length !== 0) {
            throw new HttpException("The user with such email is already exist", HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.createUser({...dto, password: hashedPassword})
        await this.avatarService.createAvatar(emptyAvatar, user.id);
        await user.save()
        throw new HttpException("The user has been created successfully", HttpStatus.CREATED)
    }
}
