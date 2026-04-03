import { User } from "./User";

export class Player extends User {
  constructor(
    id: string,
    private readonly name: string,
  ) {
    super(id);
  }

  getName() {
    return this.name;
  }

  toJSON() {
    return { ...super.toJSON(), name: this.name };
  }
}
