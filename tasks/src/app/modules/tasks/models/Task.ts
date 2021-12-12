import { TaskLevel } from "./TaskLevel";

export class Task {
  constructor(
    public title: string,
    public date: string,
    public level: TaskLevel,
    public closed: boolean,
    public description?: string,
  ){
  }

}


