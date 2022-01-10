import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { concatMap, tap } from 'rxjs/operators';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {

  public taskForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private tasksService: TasksService,
  ) {}

  public ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(null, {updateOn: 'change', validators: [Validators.required]}),
      time: new FormControl(new Date().toString(), {updateOn: 'change', validators: [Validators.required]}),
      description: new FormControl(null, {updateOn: 'change'}),
    });
  }

  public onAddTaskClose(): void {
    this.modalCtrl.dismiss();
  }

  public onAddTaskValidate(): void {
    const taskFormData = this.taskForm.value;

    this.tasksService.addTask(new Task(taskFormData.title, new Date(taskFormData.time).toTimeString().substring(0, 5), false, taskFormData.description))
    .pipe(
      tap(() => {
        this.modalCtrl.dismiss();
      }),
      concatMap(() => this.tasksService.getTasks())
    ).subscribe();

  }

}
