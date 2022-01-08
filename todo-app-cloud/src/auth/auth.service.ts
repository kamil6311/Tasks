import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    private apiKeys: string[] = [
        '6b2622a5-2251-4091-95f2-e425b7601a46',
    ];

    validateApiKey(apiKey: string) {
        return this.apiKeys.find(apiK => apiKey === apiK);
    }
}

