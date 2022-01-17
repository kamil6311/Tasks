import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { concatMap, takeUntil, tap } from 'rxjs/operators';
import { ComponentBase } from 'src/app/modules/models/component-base/component-base.component';
import { TasksService } from 'src/app/modules/tasks/services/tasks.service';
import { ILoginResponse } from '../../models/ILoginResponse';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends ComponentBase implements OnInit {

  public loginForm: FormGroup;

  private _loading: HTMLIonLoadingElement;

  constructor(private _authService: AuthService, private _router: Router, private _alterCtrl: AlertController, private _loadingCtrl: LoadingController, private _tasksService: TasksService) {
    super();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      password: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  public async login(): Promise<void> {
    await this.presentLoading("Connexion en cours");

    if(!this.loginForm.valid){
      this._loading.dismiss();
      this._alterCtrl.create({
        header: "Erreur ⚠️",
        message: "Veuillez renseigner tous les champs.",
        buttons: ["OK"]
      }).then((poAlter: HTMLIonAlertElement) => poAlter.present());
    }
    else {
      const loginData = this.loginForm.value;
      this._authService.login(loginData.username, loginData.password).pipe(
        tap({
          error: async () => {
            this._loading.dismiss();
            const alert = await this._alterCtrl.create({
              header: "Erreur lors de l'authentification. ❌",
              message: "Mauvaises informations de connexion.",
              buttons: ['OK']
            });
            await alert.present();
          }
        }),
        concatMap((res: ILoginResponse) => {
          this._loading.dismiss();
          this.presentLoading("Chargement des données...");

          return this._tasksService.getTasks().pipe(
            tap(() => {
              this._loading.dismiss();
              this._router.navigate(['/home'], { replaceUrl: true});
            })
          );
        }),
        takeUntil(this.destroyed$)
      ).subscribe();
    }
  }

  private async presentLoading(psMessage: string){
    this._loading = await this._loadingCtrl.create({
      message: psMessage,
      spinner: 'bubbles',
    });

    this._loading.present();
  }
}



// this._authService.login(loginData.username, loginData.password).pipe(
//   tap(async response => {
//     if(response) {
//       this._loading.dismiss();
//     }
//   },
//   concatMap((psLoginResponse: ILoginResponse) => {
//     this._loading.dismiss();
//     this.presentLoading("Chargement des données...");


//     return this._tasksService.getTasks().pipe(
//       tap(() => {
//         this._loading.dismiss();
//         this._router.navigate(['/home'], { replaceUrl: true});
//       })
//     );
//   }),
//   async () => {
//     this._loading.dismiss();
//     const alert = await this._alterCtrl.create({
//       header: "Erreur lors de l'authentification. ❌",
//       message: "Mauvaises informations de connexion.",
//       buttons: ['OK']
//     });
//     await alert.present();
//   }),
//   takeUntil(this.destroyed$)
// ).subscribe();
