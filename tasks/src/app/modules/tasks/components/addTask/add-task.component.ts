import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskLevel } from '../../models/TaskLevel';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  public currentTime: Date  = new Date();
  public TaskLevels: string[] = Object.values(TaskLevel);
  public levelSelected: TaskLevel = TaskLevel.normal;

  constructor(
    private modalCtrl: ModalController
  ) { }

  public ngOnInit(): void {}


  public onAddTaskClose(): void {
    this.modalCtrl.dismiss();
  }

  public onAddTaskValidate(): void {

  }

  public onSelectLevel(level: string): void {

    switch(level){
      case('normal'):
        this.levelSelected = TaskLevel.normal;
      break;
      case('important'):
        this.levelSelected = TaskLevel.important;
      break;
      case('veryImportant'):
        this.levelSelected = TaskLevel.veryImportant;
      break;

    }
  }
}
