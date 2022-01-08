import { ITask } from "./ITask";

export class Task implements ITask{
  constructor(
    public title: string,
    public date: string,
    public closed: boolean,
    public description?: string,
    public id?: string,
  ){}

}


