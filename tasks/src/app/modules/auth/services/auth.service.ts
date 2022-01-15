import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from '../models/ILoginResponse';

const jwtHelper = new JwtHelperService();
const ACCESS_TOKEN: string = "";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData = new BehaviorSubject(null);
  private accessToken: string;

  public user: Observable<any>;

  constructor(private _httpClient: HttpClient, private _storage: Storage, private _platform: Platform, private _route: Router) {
    this.loadStoredToken();
  }

  public login(psUsername: string, psPassword: string): Observable<any>{
    return this._httpClient.post(`${environment.cloud_url}/auth/login`, {"username": psUsername, "password": psPassword}, {headers: {"apiKey": environment.todo_apiKey}})
    .pipe(
      switchMap((loginResponse: ILoginResponse) => {
        let decodedToken = jwtHelper.decodeToken(loginResponse.access_token);
        this.userData.next(decodedToken);

        return from(this._storage.set(ACCESS_TOKEN, loginResponse.access_token));
      })
    );
  }

  public logOut(): Observable<void> {
    return from(this._storage.remove(ACCESS_TOKEN)).pipe(
      tap(() => {
        this._route.navigateByUrl('/');
        this.userData.next(null);
      })
    );
  }

  public getUserData(){
    return this.userData.getValue();
  }

  public getAccessToken(): string {
    return `Bearer ${this.accessToken}`;
  }

  private loadStoredToken() {
    let storage$ = from(this._storage.create());

    this.user = storage$.pipe(
      switchMap(() => {
        return from(this._storage.get(ACCESS_TOKEN)).pipe(
          tap((token: string) => this.accessToken = token)
        );
      }),
      map((token) => {
        if(token){
          console.log(`token ${token}`);
          let decodedToken = jwtHelper.decodeToken(token);
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
