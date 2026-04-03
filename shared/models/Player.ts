export class Player {
  constructor(
    private readonly id: string,
    private readonly name: string,
  ) {}

  toJSON() {
    return { id: this.id, name: this.name };
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
}
