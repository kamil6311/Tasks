import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDTO } from './UserDTO';

@Injectable()
export class AuthService {

    constructor(private _userService: UsersService, private _jwtService: JwtService, private _configService: ConfigService){ }

    private apiKeys: string[] = [
        '6b2622a5-2251-4091-95f2-e425b7601a46',
    ];

    public validateApiKey(apiKey: string) {
        return this.apiKeys.find(apiK => apiKey === apiK);
    }

    public async validateUser(username: string, password: string): Promise<any> {
        const user = await this._userService.findeOne(username);

        if(user && user.password === password){
            const { password, username, ...rest} = user;
            return rest;
        }

        return null;
    }

    public async createToken (user: UserDTO) {
        const payload = { name: user.name, sub: user.id }

        return { 
            access_token: this._jwtService.sign(payload, { secret: this._configService.get('JWT_SECRET') })
        }
    } 

}

