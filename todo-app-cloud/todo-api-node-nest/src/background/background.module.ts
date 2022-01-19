import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackgroundController } from './background.controller';
import { BackgroundService } from './background.service';
import { BackgroundImageSchema } from './IBackgroundImage';

@Module({
    controllers: [BackgroundController],
    imports: [MongooseModule.forFeature([{ name: 'BackgroundImage', schema: BackgroundImageSchema }])],
    providers: [BackgroundService],
})
export class BackgroundModule {}
