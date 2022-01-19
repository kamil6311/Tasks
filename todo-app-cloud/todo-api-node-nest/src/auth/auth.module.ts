import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { ApiKeyStrategy } from "./apiKey.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
imports: [ JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s'}
    }),
    inject: [ConfigService]
}),PassportModule, UsersModule, PassportModule],
providers: [AuthService, ApiKeyStrategy, LocalStrategy, JwtStrategy, ConfigService],
controllers: [AuthController],
exports: [AuthService]
})

export class AuthModule {}