import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDTO } from '../users/UserDTO';
import { IPayload } from './models/IPayload';

@Injectable()
export class AuthService {

    constructor(private _userService: UsersService, private _jwtService: JwtService, private _configService: ConfigService){ }

    public validateApiKey(psApiKey: string) {
        return psApiKey === this._configService.get("APIKEY");
    }

    public async validateUser(psUsername: string, psPassword: string): Promise<any> {
        return await this._userService.login(psUsername, psPassword);
    }

    public async createToken (user: UserDTO): Promise<{access_token: string}> {
        const payload: IPayload = { sub: user.id, username: user.username, name: user.name }
        return { 
            access_token: this._jwtService.sign(payload, { secret: this._configService.get('JWT_SECRET') })
        }
    } 

    public async createUser(psName: string, psUsername: string, psPassword: string): Promise<string> {
        return await this._userService.createUser(psName, psUsername, psPassword);
    }
}

