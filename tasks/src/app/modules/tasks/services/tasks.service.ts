import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DatabaseService } from '../../database/database.service';
import { ITask } from '../models/ITask';
import { Task } from '../models/Task';


@Injectable({
  providedIn: 'root'
})
export class TasksService{
  private _tasks = new BehaviorSubject<Task[]>([]);

  constructor(
    private _dataBaseService: DatabaseService, private _http: HttpClient
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
    return this._tasks.asObservable().pipe(
      map((taskList: Task[]) => {
        return taskList.sort((taskA: Task, taskB: Task) => {
          return new Date(new Date().setHours(+taskA.date.substring(0, 2), +taskA.date.substring(3, 5))).getTime() - new Date(new Date().setHours(+taskB.date.substring(0, 2), +taskB.date.substring(3, 5))).getTime()
        });
      })
    );
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

  public getTodos(): Observable<Task[]> {
    return this._http.get<ITask[]>(`${environment.cloud_url}/todos`, {headers: {'apiKey': environment.todo_apiKey}}).pipe(
      tap((result: ITask[]) => {
        return result.map((res: ITask) => plainToClass(Task, res));
      })
    );
  }
}
