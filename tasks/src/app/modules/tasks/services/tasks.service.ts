import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/Task';
import { TaskLevel } from '../models/TaskLevel';
import { take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TasksService{
  private _tasks = new BehaviorSubject<Task[]>([]);

  private basicTask: Task = new Task('01', 'BasicTask', 'My basic task', TaskLevel.normal, false);

  constructor() {
    this.addTask(this.basicTask).subscribe();
  }


  public addTask(newTask: Task): Observable<any>{
    return this.tasks.pipe(
      take(1),
      tap((tasks: Task[]) => {
        tasks.push(newTask);
        this._tasks.next(tasks);
      })
    );
  }

  public get tasks(): Observable<Task[]>{
    return this._tasks.asObservable();
  }


}


