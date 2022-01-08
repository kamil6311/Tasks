import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksListComponent } from '../tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  @ViewChild(TasksListComponent) private appTasksList: TasksListComponent

  constructor() { }

  ngOnInit() {}

  public refreshTasks(): void {
    this.appTasksList.getTodos().subscribe();
  }

}
