import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class AppService {
  
  private _headers = {
    "apiKey": "6b2622a5-2251-4091-95f2-e425b7601a46",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWU0NzQ3NzQ4MWE4OTBiNzZlZjk2ODYiLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwiaWF0IjoxNjQyNTM2NzE3LCJleHAiOjE2NDI1NDAzMTd9.Xc6YCEyPxamkRDiQg1F3x9swDZNQFOqXrivP8K296yE"
  };

  constructor(private _httpService: HttpService){
  }

  public getTodos(): Observable <any>{
    return this._httpService.get("https://todo-api-node-nest.herokuapp.com/todos", { headers: this._headers }).pipe(
      map((res) => res.data));
  }
}
