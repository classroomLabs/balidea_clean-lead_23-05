// ! ❌ Bad example not using a memento

// ! 😱 want to save state of an object to undo operations deferred in time
export class Activity {
  private title: string;
  private attendees: string[] = [];
  private places: number;

  constructor(title: string, places: number) {
    this.title = title;
    this.places = places;
  }

  get availablePlaces(): number {
    return this.places - this.attendees.length;
  }
  enroll(name: string): void {
    if (this.attendees.length >= this.places) {
      throw new Error("No more places available on " + this.title);
    }
    this.attendees.push(name);
  }
  cancel(): void {
    // ! 😱 un do enrolment cancel logic is needed here
    if (this.attendees.length === 0) {
      return;
    }
    this.attendees.pop();
  }
}
