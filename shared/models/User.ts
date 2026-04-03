export class User {
  constructor(private readonly id: string) {}

  toJSON() {
    return { id: this.id };
  }

  getId() {
    return this.id;
  }
}
