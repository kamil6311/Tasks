import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {

  @Input() selectedTask: Task;

  public taskForm: FormGroup;
  public psTaskTitle: string;

  constructor(private modalCtrl: ModalController) { }

  public ngOnInit() {

    this.taskForm = new FormGroup({
      title: new FormControl(this.selectedTask.title, {updateOn: 'change', validators: [Validators.required]}),
      time: new FormControl(this.selectedTask.date.toString(), {updateOn: 'change', validators: [Validators.required]}),
      description: new FormControl(this.selectedTask.description, {updateOn: 'change'}),
    });

    this.psTaskTitle = this.taskForm.value.title;

  }

  public closeTaskDetailModal(): void {
    const taskFormData = this.taskForm.value;
    let editedTask = new Task(taskFormData.title, taskFormData.time, this.selectedTask.closed, taskFormData.description, this.selectedTask.id);

    if(this.selectedTask.title !== editedTask.title || this.selectedTask.date !== editedTask.date || this.selectedTask.description !== editedTask.description){
      this.modalCtrl.dismiss(editedTask);
    }
    this.modalCtrl.dismiss();
  }

  public changeTitle(psTitleValue: CustomEvent<{value: string}>) {
    this.psTaskTitle = psTitleValue.detail.value;
  }

}
