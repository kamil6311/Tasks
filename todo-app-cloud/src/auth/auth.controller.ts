import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiSecurity } from '@nestjs/swagger';
import { UserDTO } from '../users/UserDTO';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiSecurity('apiKey')
//@ApiExcludeController(true)
export class AuthController {

    constructor(private readonly _authService: AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Request() req): any {
        return this._authService.createToken(req.user);
    }

    @Post('register')
    @ApiBody({type: UserDTO})
    public async register(@Body("name") psName: string, @Body("username") psUsername: string, @Body("password") psPassword: string): Promise<string> {
        return await this._authService.createUser(psName, psUsername, psPassword);
    }
}
