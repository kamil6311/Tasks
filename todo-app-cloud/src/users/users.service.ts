import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IUser } from './IUser';


export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {

    constructor(@InjectModel('Users') private readonly _userModel: Model<IUser>){}
    
    public async findeOne(psUsername: string): Promise<IUser | undefined> {

        const user = await this._userModel.findOne({username: psUsername}).exec();
        
        if(!user){
            return null;
        }
        return {id: user._id, name: user.name, username: user.username, password: user.password};
    }

    public async login(psUsername: string, psPassword: string): Promise<any>{
        const user  = await this.findeOne(psUsername);

        if(user) {
            const isPasswordValid: boolean = await bcrypt.compare(psPassword, user.password);

            if(isPasswordValid) {
                const { password, username, ...rest} = user;

                return rest;
            }
            else {
                throw new HttpException("Password incorrect.", HttpStatus.NOT_ACCEPTABLE);
            }
        }
        throw new HttpException(`Username '${psUsername}' not found.`, HttpStatus.NOT_FOUND);
    }

    public async createUser(psName: string, psUsername: string, psPassword: string): Promise<string> {
        if(await this.findeOne(psUsername)){
            throw new HttpException(`User with username '${psUsername}' already exists.`, HttpStatus.CONFLICT);
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(psPassword, salt);
        const newUser = new this._userModel({name: psName, username: psUsername, password: hashedPassword});
        const result = await newUser.save();

        return result._id;
    }
}
