import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { AddTaskComponent } from '../modules/tasks/components/addTask/add-task.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public currentDate: string = new Date().toLocaleDateString('fr-FR', {weekday: 'long', month: 'long', day: 'numeric'});
  public modalOpened: boolean = false;

  constructor(
    private modalCtrl: ModalController
  ) {}


  public onAddTaskClick(): void{
    this.modalCtrl.create({component: AddTaskComponent}).then(modal => {
        modal.present();
        this.modalOpened = true;
        modal.onDidDismiss().then((data) => {
          this.modalOpened = false;
        })
      }
    )
  }

  public doRefresh(event): void {
    console.log('Refreshing tasks...');
    event.target.complete();
  }

}
