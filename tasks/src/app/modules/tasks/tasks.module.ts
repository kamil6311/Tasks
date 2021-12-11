import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksListComponent } from './components/tasksList/tasks-list.component';
import { AddTaskComponent } from './components/addTask/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TasksComponent, TasksListComponent, AddTaskComponent],
  imports: [
    CommonModule,IonicModule, FormsModule, ReactiveFormsModule
  ],
  exports: [TasksComponent, TasksListComponent, AddTaskComponent],

})
export class TasksModule { }
