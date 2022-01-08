import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BackgroundService } from './background.service';
import { IBackgroundImage } from './IBackgroundImage';

@Controller('background')
@ApiSecurity('apiKey')
@ApiTags('Background')
export class BackgroundController {
    constructor(private _bgService: BackgroundService){}

    @Get()
    public async getBackgroundImage(): Promise<IBackgroundImage> {
        return await this._bgService.getImageBackground();
    }

    @Patch()
    @ApiBody({type: String, required: true, description: "Base64 encoded image."})
    public async setBackgroundImage(@Body("base64Image") psBase64Image: string): Promise<string> {
        return await this._bgService.saveBackgroundImage(psBase64Image);
    }
}
