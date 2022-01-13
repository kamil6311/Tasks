import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User [] = [
        {
            id: 1,
            name: "Kamîl",
            username: "kams",
            password: "kams"
        }
    ];
    
    public async findeOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
