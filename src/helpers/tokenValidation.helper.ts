import {UnauthorizedException} from "@nestjs/common";

export const tokenValidationHelper = (req) => {
    if (!req.headers.authorization) {
        throw new UnauthorizedException({message: "User is unauthorized validation 1"})
    }
    const authHeader = req.headers.authorization
    const bearer = authHeader.split(" ")[0]
    const token = authHeader.split(" ")[1]

    if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({message: "User is unauthorized validation 2"})
    }
    return token
}
