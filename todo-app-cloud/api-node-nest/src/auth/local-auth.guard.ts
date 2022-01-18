import { Controller } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class LocalAuthGuard extends AuthGuard('local') {
}