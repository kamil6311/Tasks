import { IUserInfos } from "./IUserInfos";

export class UserInfos implements IUserInfos {
  public sub: string;

  public username: string;

  public name: string;

  public iat: number;

  public exp: number;

  constructor(sub: string, username: string, name: string, iat: number, exp: number){
    this.sub = sub;
    this.username = username;
    this.name = name;
    this.iat = iat;
    this.exp = exp;
  }

  public editName(psNewName: string): void {
    this.name = psNewName;
  }

  public editUsername(psNewUsername: string): void {
    this.username = psNewUsername;
  }
}

