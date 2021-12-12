import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/Task';
import { TaskLevel } from '../models/TaskLevel';
import { take, tap } from 'rxjs/operators'
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
            level: action.payload.exportVal().level,
            closed: action.payload.exportVal().closed,
            description: action.payload.exportVal().description,
          });
        });
        this._tasks.next(updatedTasks);
      })
    ).subscribe();
  }

  public get tasks(): Observable<Task[]>{
    return this._tasks.asObservable();
  }


}



