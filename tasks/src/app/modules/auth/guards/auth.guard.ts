import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _alertCtrl: AlertController, private _router: Router){}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._authService.userInfos.pipe(
      map((user) => {
        if(!user){
          this._router.navigateByUrl('/auth');
          return false;
        }
        else {
          return true;
        }
      })
    );
  }

}
