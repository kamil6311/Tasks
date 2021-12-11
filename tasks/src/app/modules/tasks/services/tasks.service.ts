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

  private basicTask: Task = new Task(1, 'BasicTask', new Date().toTimeString().substring(0, 5), TaskLevel.normal, false, 'My basic task');

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



