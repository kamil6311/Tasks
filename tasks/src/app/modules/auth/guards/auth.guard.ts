import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _alertCtrl: AlertController, private _router: Router){}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._authService.user.pipe(
      take(1),
      map((user) => {
        if(!user){
          this._alertCtrl.create({
            header: "Non autorisé",
            message: "Vous devez être connecté pour accéder à cette page.",
            buttons: ["OK"]
          }).then(alert => alert.present());
          this._router.navigateByUrl('/');
          return false;
        }
        else {
          return true;
        }
      })
    );
  }

}
