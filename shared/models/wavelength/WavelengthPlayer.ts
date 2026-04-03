import { Player } from "@shared/models/Player";

export class WavelengthPlayer extends Player {
  private score: number = 0;
  private selectedNumber: number = 0;

  constructor(id: string, name: string) {
    super(id, name);
  }

  addScore(score: number) {
    this.score += score;
  }

  setSelectedNumber(selection: number) {
    this.selectedNumber = selection;
  }

  getScore() {
    return this.score;
  }

  getSelectedNumber() {
    return this.selectedNumber;
  }
}
