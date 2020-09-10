export class Task {
  id: number;
  description: string;
  done: boolean;

  constructor(description: string, done: boolean = false) {
    this.description = description;
    this.done = done;
  }
}
