import { ApiProperty } from "@nestjs/swagger";

export class BackgroundDTO {

    @ApiProperty({name: "base64String", type: String, required: true})
    public base64String: string;
    
}