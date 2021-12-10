import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TasksService } from '../../services/tasks.service';
import { take, tap } from 'rxjs/operators'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {

  public tasksList: Task[];

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.tasksService.tasks.pipe(
      tap((tasks: Task[]) => {
        this.tasksList = tasks;
      })
    ).subscribe();

  }

}


