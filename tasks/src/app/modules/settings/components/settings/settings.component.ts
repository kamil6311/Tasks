import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { takeUntil, tap } from 'rxjs/operators';
import { ComponentBase } from '../../../models/component-base/component-base.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends ComponentBase {

  private loading: HTMLIonLoadingElement;
  private base64ImageString: string;

  public selectedFile: File = null;

  constructor(private _settingsService: SettingsService, private _modalCtrl: ModalController, private _loadingCtrl: LoadingController)
  {
    super();
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
      await this.presentLoading();
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

  public cancelSettings(): void {
    this._modalCtrl.dismiss();
  }

  private async presentLoading(){
    this.loading = await this._loadingCtrl.create({
      message: "Enregistrement en cours..."
    });

    this.loading.present();
  }
}

