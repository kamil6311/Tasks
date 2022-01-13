import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private _configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _configService.get('JWT_SECRET') 
        })
    }

    public async validate(payload: any) {
        //Si token valid inserer la logique ici

        return {
            id: payload.sub,
            name: payload.name
        };
    }
}