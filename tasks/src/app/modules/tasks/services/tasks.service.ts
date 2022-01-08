import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITask } from '../models/ITask';
import { Task } from '../models/Task';


@Injectable({
  providedIn: 'root'
})
export class TasksService{
  private _tasks = new BehaviorSubject<Task[]>([]);

  constructor(
    private _http: HttpClient
  ) { }


  public addTask(newTask: Task): Observable<string>{
    return this._http.post<string>(`${environment.cloud_url}/todos/newTodo`, newTask, { headers: {"apiKey": environment.todo_apiKey}, responseType: 'text' as 'json'});
  }

  public removeTask(poTask: Task): Observable<string>{
    return this._http.delete<string>(`${environment.cloud_url}/todos/${poTask.id}`, {headers: {"apiKey": environment.todo_apiKey}});
  }

  public editTask(poEditedTask: Task): Observable<string>{
    return this._http.patch<string>(`${environment.cloud_url}/todos/${poEditedTask.id}`, {
      "title": poEditedTask.title,
      "description": poEditedTask.description,
      "closed": `${poEditedTask.closed}`,
      "date": poEditedTask.date
    }, { headers: {"apiKey": environment.todo_apiKey}});
  }

  public getTodos(): Observable<Task[]> {
    return this._http.get<ITask[]>(`${environment.cloud_url}/todos`, {headers: {'apiKey': environment.todo_apiKey}}).pipe(
      tap((result: ITask[]) => {
        return result.map((res: ITask) => plainToClass(Task, res));
      })
    );
  }
}
