import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "../users/users.service";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private _authService: AuthService){
        super();
    }
    
    public async validate(username: string, password: string): Promise<User> {

        const user = await this._authService.validateUser(username, password);
        
        if(!user){
            throw new UnauthorizedException();
        }   
        
        return user;
    }
}