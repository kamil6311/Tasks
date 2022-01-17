import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { from, interval, Observable } from 'rxjs';
import { concatMap, take, takeUntil, tap } from 'rxjs/operators';
import { ComponentBase } from '../../../models/component-base/component-base.component';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/tasks.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent extends ComponentBase implements OnInit {
  @ViewChild(IonItemSliding) slidingItem: IonItemSliding;

  public tasksList: Task[];
  public editTaskForm: FormGroup;

  private checkTaskClicked: boolean;

  constructor(
    private tasksService: TasksService, private modalCtrl: ModalController
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getTodos().subscribe();
  }

  public deleteTask(poTask: Task){
    this.tasksService.removeTask(poTask).pipe(
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  public editTask(poTask: Task){
    this.selectTask(poTask);
    this.slidingItem.close();
  }

  public toggleTaskChange(poTask: Task, pbEvent: CustomEvent<{checked: boolean}>){
    poTask.closed = pbEvent.detail.checked;
    this.tasksService.editTask(poTask).pipe(
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  public async selectTask(poSelectedTask: Task){
    if(!this.checkTaskClicked){
      const modalTaskDetail = await this.modalCtrl.create({
        component: TaskDetailComponent,
        componentProps: { 'selectedTask': poSelectedTask }
      });

      modalTaskDetail.onDidDismiss().then((modalDetailTaskData) => {
        if(modalDetailTaskData.data)
          this.tasksService.editTask(modalDetailTaskData.data).pipe(
            takeUntil(this.destroyed$)
          ).subscribe();
      });

      return modalTaskDetail.present();
    }
  }

  public checkTask(): void {
    this.checkTaskClicked = true;
    from(interval(100).pipe(
      take(1),
      tap({
        complete: () => { this.checkTaskClicked = false; }
      }),
      takeUntil(this.destroyed$)
    )).subscribe();
  }

  public getTodos(): Observable<Task[]> {
    return this.tasksService.getTasks().pipe(
      concatMap(() => {
        return this.tasksService.tasks.pipe(
          tap((tasks: Task[]) => this.tasksList = tasks),
          takeUntil(this.destroyed$))
      }),
      takeUntil(this.destroyed$)
    );
  }
}


