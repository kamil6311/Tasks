import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BgImage } from '../models/BgImage';
import { IBgImage } from '../models/IBgImage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private _http: HttpClient) { }

  public saveBackgroundImage(psBase64Image: string): Observable<string> {
    return this._http.patch<string>(`${environment.cloud_url}/background`, {"base64Image": psBase64Image}, {headers: {"apiKey": environment.todo_apiKey}, responseType: 'text' as 'json'});
  }

  public getBackgroundImage(): Observable<BgImage>{
    return this._http.get<IBgImage>(`${environment.cloud_url}/background`, {headers: {"apiKey": environment.todo_apiKey}}).pipe(
      tap((result: IBgImage) => plainToClass(BgImage, result))
    );
  }
}
