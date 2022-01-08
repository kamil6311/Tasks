import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/modules/database/database.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  private loading: HTMLIonLoadingElement;
  private base64ImageString: string;

  public selectedFile: File = null;

  constructor(private _database: DatabaseService, private _settingsService: SettingsService, private _modalCtrl: ModalController, private _loadingCtrl: LoadingController) { }

  public ngOnInit() {
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
      await this.presetLoading();
      this._settingsService.saveBackgroundImage(this.base64ImageString).pipe(
        tap((result: string) => {
          if(result){
            this.loading.dismiss();
            this._modalCtrl.dismiss();
          }
        })
      ).subscribe();
    }
    else{
      this._modalCtrl.dismiss();
    }
  }

  public cancelSettings(): void {
    this._modalCtrl.dismiss();
  }

  private async presetLoading(){
    this.loading = await this._loadingCtrl.create({
      message: "Enregistrement en cours..."
    });

    this.loading.present();
  }
}
