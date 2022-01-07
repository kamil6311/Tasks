import { ApiProperty } from "@nestjs/swagger";

export class TodoDTO {
    
    public _id: string;
    
    @ApiProperty({example: "My todo"})
    public title: string;

    @ApiProperty({example: "My description"})
    public description: string;

    @ApiProperty({example: "false"})
    public closed: boolean;

    @ApiProperty({example: "18:00"})
    public date: string;
}