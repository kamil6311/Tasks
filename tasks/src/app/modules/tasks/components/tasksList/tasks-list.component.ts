import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/tasks.service';
import { take, tap } from 'rxjs/operators'
import { IonInput, IonItemSliding } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    private tasksService: TasksService
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
    this.mbTaskEdited = false;
    const editedTaskData = this.editTaskForm.value;
    const newTask = new Task(editedTaskData.title, editedTaskData.date, poTask.closed, '', poTask.id);
    this.tasksService.editTask(newTask).subscribe();
  }

}


