import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksListComponent } from './components/tasksList/tasks-list.component';
import { AddTaskComponent } from './components/addTask/add-task.component';


@NgModule({
  declarations: [TasksComponent, TasksListComponent, AddTaskComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports: [TasksComponent, TasksListComponent, AddTaskComponent],

})
export class TasksModule { }
