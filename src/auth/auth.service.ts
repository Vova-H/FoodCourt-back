import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UsersModel} from "../users/users.model";
import * as bcrypt from "bcryptjs"
import {InjectModel} from "@nestjs/sequelize";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {

    constructor(@InjectModel(UsersModel)
                private userModel: UsersModel,
                private userService: UsersService,
                private jwtService: JwtService
    ) {
    }

    async login(dto: LoginDto) {
        const user = await UsersModel.findOne({where: {email: dto.email}, include: {all: true}})
        if (!user) {
            throw new UnauthorizedException({message: "The are no users with such email"})
        }
        const passwordsCompare = bcrypt.compare(dto.password, user.password)
        if (passwordsCompare) {
            const payload = {email: user.email, id: user.id, roles: user.roles}
            return {
                token: this.jwtService.sign(payload)
            }
        }
        throw new UnauthorizedException({message: "wrong password or email"})
    }

    async registration(dto) {
        const dtoEmail = dto.email
        const candidate = await UsersModel.findAll({where: {email: dtoEmail}})
        if (candidate.length !== 0) {
            throw new HttpException("The user with such email is already exist", HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5)
        await this.userService.createUser({...dto, password: hashedPassword})
        throw new HttpException("The user has been created successfully", HttpStatus.CREATED)
    }
}
