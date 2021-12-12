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
      level: newTask.level,
      closed: false
    }));
  }

  public getTasks(): Observable<any> {
    return from(this._afDb.list('Tasks/').snapshotChanges(['child_added', 'child_removed']));
  }

}
