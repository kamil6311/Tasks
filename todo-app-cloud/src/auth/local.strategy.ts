import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private _authService: AuthService){
        super();
    }
    
    public async validate(username: string, password: string): Promise<string> {

        const loginMessage = await this._authService.validateUser(username, password);
        
        if(!loginMessage){
            throw new UnauthorizedException();
        }   
        
        return loginMessage;
    }
}