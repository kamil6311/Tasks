import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private _authService: AuthService, private _router: Router, private _alterCtrl: AlertController) { }

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
          console.log('login failed');
          const alert = await this._alterCtrl.create({
            header: "Erreur lors de l'authentification.",
            message: "Mauvaises informations de connexion.",
            buttons: ['OK']
          });
          await alert.present();
        })
      ).subscribe();
    }
  }

  public onLogOut() {
    this._authService.logOut().subscribe();
  }

}
