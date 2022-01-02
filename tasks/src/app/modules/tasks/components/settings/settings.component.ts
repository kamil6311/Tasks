import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/modules/database/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  private selectedFile: File;
  private loading: HTMLIonLoadingElement;

  constructor(private _database: DatabaseService, private _modalCtrl: ModalController, private _loadingCtrl: LoadingController) { }

  public ngOnInit() {}

  public onFileSelected(poFileEvent): void {
    this.selectedFile = poFileEvent.target.files[0];
    console.log(this.selectedFile);
  }

  public async validateSettings(){
    if(this.selectedFile){
      await this.presetLoading();

      this._database.saveBackground(this.selectedFile).pipe(
        tap(async () => {
          this.loading.dismiss();
          this._modalCtrl.dismiss()
        })
      ).subscribe();
    }
    else{
      this._modalCtrl.dismiss();
    }
  }

  private async presetLoading(){
    this.loading = await this._loadingCtrl.create({
      message: "Enregistrement en cours..."
    });

    this.loading.present();
  }

}
