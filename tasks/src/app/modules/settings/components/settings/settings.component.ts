import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { plainToClass } from 'class-transformer';
import { take, takeUntil, tap } from 'rxjs/operators';
import { IUserInfos } from '../../../auth/models/IUserInfos';
import { UserInfos } from '../../../auth/models/UserInfos';
import { AuthService } from '../../../auth/services/auth.service';
import { ComponentBase } from '../../../models/component-base/component-base.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends ComponentBase implements OnInit {

  private loading: HTMLIonLoadingElement;
  private base64ImageString: string;

  public selectedFile: File = null;
  public userInfos: UserInfos;

  constructor(
    private _settingsService: SettingsService,
    private _modalCtrl: ModalController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _authService: AuthService,
    private _navCtrl: NavController
    )
  {
    super();
  }

  public ngOnInit(): void {
    this._authService.getUserData().pipe(
      take(1),
      tap((poUserInfos: IUserInfos) => {
        this.userInfos = plainToClass(UserInfos, poUserInfos);
        console.log(this.userInfos);
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  public async onFileSelected(poFileEvent): Promise<void> {
    this.selectedFile = poFileEvent.target.files[0];
    const reader = new FileReader();

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.selectedFile);
  }

  public handleReaderLoaded(e){
    this.base64ImageString = (e.target.result);
  }

  public async validateSettings(){
    if(this.selectedFile){
      await this.presentLoading("Enregistrement en cours...");
      this._settingsService.saveBackgroundImage(this.base64ImageString).pipe(
        tap((result: string) => {
          if(result){
            this.loading.dismiss();
            this._modalCtrl.dismiss();
          }
        }),
        takeUntil(this.destroyed$)
      ).subscribe();
    }
    else{
      this._modalCtrl.dismiss();
    }
  }

  public onLogOut(): void {
    this._alertCtrl.create({
      header: "Déconnexion",
      message: "Êtes vous sûr de vouloir vous déconnecter ?",
      buttons: ["Annuler",
        {
          text: "OK",
          handler: () => this.logOut()
        }
      ]
    }).then((poAlert: HTMLIonAlertElement) => poAlert.present());
  }

  public cancelSettings(): void {
    this._modalCtrl.dismiss();
  }

  private async presentLoading(psMessage: string){
    this.loading = await this._loadingCtrl.create({
      message: psMessage
    });

    this.loading.present();
  }

  private async logOut(): Promise<void> {
    await this.presentLoading("Déconnexion en cours...");

    this._authService.logOut().pipe(
      tap(() => {
        this._loadingCtrl.dismiss();
        this._modalCtrl.dismiss();
        this._navCtrl.navigateBack('/');
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }
}

