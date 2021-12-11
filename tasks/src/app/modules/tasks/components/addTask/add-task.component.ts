import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Task } from '../../models/Task';
import { TaskLevel } from '../../models/TaskLevel';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  public currentTime: Date  = new Date();
  public TaskLevels: string[] = Object.values(TaskLevel);
  public levelSelected: TaskLevel = TaskLevel.normal;
  public taskForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private tasksService: TasksService
  ) {

  }

  public ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(null,{updateOn: 'change', validators: [Validators.required]}),
      time: new FormControl(null,{updateOn: 'change', validators: [Validators.required]}),
      level: new FormControl(null,{updateOn: 'change'}),
      description: new FormControl(null,{updateOn: 'change'}),
    });
  }


  public onAddTaskClose(): void {
    this.modalCtrl.dismiss();
  }

  public onAddTaskValidate(): void {
    const taskFormData = this.taskForm.value;

    this.tasksService.addTask(new Task(Math.random(), taskFormData.title, new Date(taskFormData.time).toTimeString().substring(0, 5), TaskLevel.normal, false, taskFormData.description))
    .subscribe(() => this.modalCtrl.dismiss());
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
