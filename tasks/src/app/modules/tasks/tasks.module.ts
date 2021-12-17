import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TasksComponent } from './components/tasks/tasks.component';


@NgModule({
  declarations: [TasksComponent, TasksListComponent, AddTaskComponent, TaskDetailComponent],
  imports: [
    CommonModule,IonicModule, FormsModule, ReactiveFormsModule
  ],
  exports: [TasksComponent, TasksListComponent, AddTaskComponent, TaskDetailComponent],

})
export class TasksModule { }
