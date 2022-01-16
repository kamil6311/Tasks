import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  private _loading: HTMLIonLoadingElement;

  public registerForm: FormGroup;

  constructor(private _authService: AuthService, private _alertCtrl: AlertController, private _loadingCtrl: LoadingController, private _route: Router, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      username: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      password: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  public async onRegister(): Promise<void> {
    if(this.registerForm.valid){
      const registerData = this.registerForm.value;
      await this.presentLoading();

      this._authService.register(registerData.name, registerData.username, registerData.password).pipe(
        tap({
          next: (responseToken: string) => {
            if(responseToken) {
              this._loading.dismiss();
              this._route.navigateByUrl('/home');
            }
          },
          error: (httpError: HttpErrorResponse) => {
            if(httpError.status === HttpStatusCode.Conflict){
              this._alertCtrl.create({
                header: "Mauvais nom d'utilisateur",
                message: `Le nom d'utilisateur <b>${registerData.username}</b> est déja utilisé !`,
                buttons: ['OK']
              }).then(poAlert => poAlert.present());
            }
          }
        }),
      ).subscribe();
    }
  }

  private async presentLoading(){
    this._loading = await this._loadingCtrl.create({
      message: "Création du compte...",
      spinner: 'crescent'
    });

    this._loading.present();
  }

}
