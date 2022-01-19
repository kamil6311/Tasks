import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './IUser';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])]
})
export class UsersModule {}
