import { Roles } from '../../consts/Roles';

export class JwtInfo {
  id: number = null;
  usr: string = null;
  role: Roles = null;

  public toString = (): string => {
    return `${this.id}.${this.usr}.${this.role}`;
  };
}
