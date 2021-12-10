import { TaskLevel } from "./TaskLevel";

export class Task {
  constructor(
    private readonly id: string,
    public title: string,
    public description: string,
    public level: TaskLevel,
    public closed: boolean,
  ){
  }

}


