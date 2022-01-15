import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserDTO } from '../users/UserDTO';

@Injectable()
export class AuthService {

    constructor(private _userService: UsersService, private _jwtService: JwtService, private _configService: ConfigService){ }

    private apiKeys: string[] = [
        '6b2622a5-2251-4091-95f2-e425b7601a46',
    ];

    public validateApiKey(apiKey: string) {
        return this.apiKeys.find(apiK => apiKey === apiK);
    }

    public async validateUser(psUsername: string, psPassword: string): Promise<string> {
        return await this._userService.login(psUsername, psPassword);
    }

    public async createToken (user: UserDTO) {
        const payload = { name: user.name, sub: user.id }

        return { 
            access_token: this._jwtService.sign(payload, { secret: this._configService.get('JWT_SECRET') })
        }
    } 

    public async createUser(psName: string, psUsername: string, psPassword: string): Promise<string> {
        return await this._userService.createUser(psName, psUsername, psPassword);
    }
}

