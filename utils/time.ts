/** 
 * @param {duration} in seconds
*/
export class Timer {
  private duration: number;
  private remaining: number;
  private interval: NodeJS.Timeout | null = null;
  private onTick?: (time: number) => void;
  private onEnd?: () => void;

  constructor(
    duration: number,
    onTick?: (time: number) => void,
    onEnd?: () => void,
  ) {
    this.duration = duration;
    this.remaining = duration;
    this.onTick = onTick;
    this.onEnd = onEnd;
  }

  start() {
    this.interval = setInterval(() => {
      this.remaining--;

      if (this.onTick) this.onTick(this.remaining);

      if (this.remaining <= 0) {
        this.stop();
        if (this.onEnd) this.onEnd();
      }
    }, 1000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  reset() {
    this.stop();
    this.remaining = this.duration;
  }
}

export class Stopwatch {
  constructor() {
    throw new Error("Method not implemented.");
  }
}
