import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { takeUntil, tap } from 'rxjs/operators';
import { ComponentBase } from 'src/app/modules/models/component-base/component-base.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends ComponentBase implements OnInit {

  public loginForm: FormGroup;

  constructor(private _authService: AuthService, private _router: Router, private _alterCtrl: AlertController) {
    super();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      password: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  public login(): void {
    if(this.loginForm.valid){
      const loginData = this.loginForm.value;

      this._authService.login(loginData.username, loginData.password).pipe(
        tap(async response => {
          if(response) {
            this._router.navigateByUrl('/home');
          }
        },
        async () => {
          const alert = await this._alterCtrl.create({
            header: "Erreur lors de l'authentification.",
            message: "Mauvaises informations de connexion.",
            buttons: ['OK']
          });
          await alert.present();
        }),
        takeUntil(this.destroyed$)
      ).subscribe();
    }
  }

  public onRegister() {
  }

}
