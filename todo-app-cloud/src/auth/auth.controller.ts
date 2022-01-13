import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Authentcation')
@ApiSecurity('apiKey')
export class AuthController {

    constructor(private readonly _authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Request() req): any {
        return this._authService.createToken(req.user);
    }
}
