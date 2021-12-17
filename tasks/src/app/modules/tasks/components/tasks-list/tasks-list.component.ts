import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/tasks.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  @ViewChild(IonItemSliding) slidingItem: IonItemSliding;

  public tasksList: Task[];
  public editTaskForm: FormGroup;

  private mbTaskEdited: boolean = false;

  constructor(
    private tasksService: TasksService, private modalCtrl: ModalController
  ) { }

  public ngOnInit(): void {
    this.tasksService.tasks.pipe(
      tap((tasks: Task[]) => {
        this.tasksList = tasks;
      })
    ).subscribe();
  }

  public deleteTask(poTask: Task){
    this.tasksService.removeTask(poTask).subscribe();
  }

  public editTask(poTask: Task){
    this.mbTaskEdited = true;
    this.slidingItem.close();
    this.editTaskForm = new FormGroup({
      title: new FormControl(poTask.title, { updateOn: 'change', validators: [Validators.required] }),
      date: new FormControl(poTask.date, { updateOn: 'change', validators: [Validators.required] })
    });
  }

  public isTaskEdited(): boolean {
    return this.mbTaskEdited;
  }

  public toggleTaskChange(poTask: Task, pbEvent: CustomEvent<{checked: boolean}>){
    this.tasksService.setTaskChecked(poTask, pbEvent.detail.checked);
  }

  public validateTaskEdit(poTask: Task): void {
    const editedTaskData = this.editTaskForm.value;
    const newTask = new Task(editedTaskData.title, editedTaskData.date, poTask.closed, '', poTask.id);
    this.tasksService.editTask(newTask).pipe(
      tap(() => {
        this.mbTaskEdited = false;
      })
    ).subscribe();
  }

  public async selectTask(poSelectedTask: Task){
    const modalTaskDetail = await this.modalCtrl.create({
      component: TaskDetailComponent,
      componentProps: { 'selectedTask': poSelectedTask }
    });

    modalTaskDetail.onDidDismiss().then((modalDetailTaskData) => {
      if(modalDetailTaskData.data){
        this.tasksService.editTask(modalDetailTaskData.data);
        this.tasksService.getTasks();
      }
    });

    return modalTaskDetail.present();
  }

}


