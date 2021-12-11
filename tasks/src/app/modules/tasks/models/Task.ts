import { TaskLevel } from "./TaskLevel";

export class Task {
  constructor(
    private readonly id: number,
    public title: string,
    public date: string,
    public level: TaskLevel,
    public closed: boolean,
    public description?: string,

  ){
  }

}


