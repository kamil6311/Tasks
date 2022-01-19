import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IPayload } from "./models/IPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private _configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true, //TODO add verify token is still valid 
            secretOrKey: _configService.get('JWT_SECRET') 
        })
    }

    public async validate(poPayload: IPayload) {
        return {
            id: poPayload.sub,
            username: poPayload.username,
            name: poPayload.name
        };
    }
}