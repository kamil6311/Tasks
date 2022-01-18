import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from '../models/ILoginResponse';
import { IUserInfos } from '../models/IUserInfos';

const jwtHelper = new JwtHelperService();
const ACCESS_TOKEN: string = "";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData = new BehaviorSubject<IUserInfos>(null);
  private static accessToken: string;

  public userInfos: Observable<any>;

  constructor(private _httpClient: HttpClient, private _storage: Storage) {
    this.loadStoredToken();
  }

  public login(psUsername: string, psPassword: string): Observable<ILoginResponse>{
    return this._httpClient.post<ILoginResponse>(`${environment.cloud_url}/auth/login`, {"username": psUsername, "password": psPassword}, {headers: {"apiKey": environment.todo_apiKey}})
    .pipe(
      tap((loginResponse: ILoginResponse) => {
        let decodedToken: IUserInfos = jwtHelper.decodeToken(loginResponse.access_token);
        this.userData.next(decodedToken);
        AuthService.accessToken = loginResponse.access_token;

        this._storage.set(ACCESS_TOKEN, loginResponse.access_token);
      })
    );
  }

  public register(psName: string, psUsername: string, psPassword: string): Observable<any> {
    return this._httpClient.post<string>(`${environment.cloud_url}/auth/register`, {"name": psName, "username": psUsername, "password": psPassword}, {headers: {"apiKey": environment.todo_apiKey}})
    .pipe(
      concatMap((resultId: string) => {
        if(resultId){
          return this.login(psUsername, psPassword);
        }
      })
    )
  }

  public logOut(): Observable<any> {
    return from(this._storage.remove(ACCESS_TOKEN)).pipe(
      tap(() => {
        this.userData.next(null);
      })
    );
  }

  public getUserData(): Observable<IUserInfos>{
    return this.userData.asObservable();
  }

  public getAccessToken(): string {
    return `Bearer ${AuthService.accessToken}`;
  }

  public loadStoredToken() {
    let storage$ = from(this._storage.create());
    return this.userInfos = storage$.pipe(
      switchMap(() => {
        return from(this._storage.get(ACCESS_TOKEN)).pipe(
          tap((token: string) => AuthService.accessToken = token)
        );
      }),
      map((token) => {
        if(token){
          console.log(`token ${token}`);
          let decodedToken: IUserInfos = jwtHelper.decodeToken(token);
          this.userData.next(decodedToken);
          return true;
        }
        else{
          return null;
        }
      })
    );

  }

}
