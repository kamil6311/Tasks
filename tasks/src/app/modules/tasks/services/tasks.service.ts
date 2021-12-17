import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/Task';
import { tap } from 'rxjs/operators'
import { DatabaseService } from '../../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService{
  private _tasks = new BehaviorSubject<Task[]>([]);

  constructor(
    private _dataBaseService: DatabaseService
  ) {
    this.getTasks();
  }


  public addTask(newTask: Task): Observable<any>{
    return this._dataBaseService.addTask(newTask);
  }

  public getTasks(): void{
    let updatedTasks: Task[] = [];

    this._dataBaseService.getTasks().pipe(
      tap(actions => {
        updatedTasks = [];
        actions.forEach(action => {
          updatedTasks.push({
            title: action.payload.exportVal().title,
            date: action.payload.exportVal().date,
            closed: action.payload.exportVal().closed,
            description: action.payload.exportVal().description,
            id: action.key
          });
        });
        this._tasks.next(updatedTasks);
      })
    ).subscribe();
  }

  public removeTask(poTask: Task): Observable<any>{
    return this._dataBaseService.removeTask(poTask);
  }

  public get tasks(): Observable<Task[]>{
    return this._tasks.asObservable();
  }

  public setTaskChecked(poTask: Task, pbCheckedValue: boolean): Observable<any> {
    return this._dataBaseService.setTaskChecked(poTask, pbCheckedValue);
  }

  public editTask(poEditedTask): Observable<any> {
    return this._dataBaseService.editTask(poEditedTask).pipe(
      tap(() => {
        this.getTasks();
      })
    );
  }
}
