import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { from, Observable } from 'rxjs';
import { Task } from '../tasks/models/Task';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private _afDb: AngularFireDatabase
  ) { }

  public addTask(newTask: Task): Observable<any> {
    return from(this._afDb.list('Tasks/').push({
      title: newTask.title,
      date: newTask.date,
      description: newTask.description,
      closed: false
    }));
  }

  public removeTask(poTask: Task): Observable<any> {
    return from(this._afDb.list('Tasks/').remove(poTask.id));
  }

  public getTasks(): Observable<any> {
    return from(this._afDb.list('Tasks/').snapshotChanges(['child_added', 'child_removed']));
  }

  public setTaskChecked(poTask: Task, pbCheckValue: boolean): Observable<any> {
    return from(this._afDb.list(`Tasks/`).update(poTask.id, { closed: pbCheckValue }));
  }

  public editTask(poEditedTask: Task): Observable<any> {
    return from(this._afDb.list('Tasks/').update(poEditedTask.id, { title: poEditedTask.title, date: poEditedTask.date, description: poEditedTask.description }));
  }

}
