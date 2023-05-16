// * ✅ Command solution

// * 😏 Command interface
export interface Command {
  execute(activity: string, participant: string): void;
  // ToDo: add a unDo reDo methods
}

// * 😏 Concrete command class 1
export class EnrollCommand implements Command {
  constructor(private receiver: EnrolmentReceiver) {}
  execute(activity: string, participant: string): void {
    this.receiver.enroll(activity, participant);
    // * 😏 Alternatively, we could implement the business logic here
  }
}

// * 😏 Concrete command class 2
export class UnenrollCommand implements Command {
  constructor(private receiver: EnrolmentReceiver) {}
  execute(activity: string, participant: string): void {
    this.receiver.unenroll(activity, participant);
  }
}

// * 😏 Custom Invoker class
export class EnrolmentInvoker {
  private receiver: EnrolmentReceiver = new EnrolmentReceiver();
  constructor() {}
  dispatchEnrollment(activity: string, participant: string): void {
    const enrollCommand: Command = new EnrollCommand(this.receiver);
    enrollCommand.execute(activity, participant);
  }
  dispatchUnEnrollment(activity: string, participant: string): void {
    const unenrollCommand: Command = new UnenrollCommand(this.receiver);
    unenrollCommand.execute(activity, participant);
  }
}

// * 😏 Generic Invoker class
export class Invoker {
  // ToDo: add a history of commands
  // ToDo: add serialization/deserialization for later or remote use
  constructor(private command: Command) {}
  execute(activity: string, participant: string): void {
    this.command.execute(activity, participant);
  }
}

// * 😏 Receiver class (The business logic)
export class EnrolmentReceiver {
  enroll(activity: string, participant: string): void {
    console.log(`Enrolling ${participant} in ${activity}`);
  }

  unenroll(activity: string, participant: string): void {
    console.log(`Un-enrolling ${participant} in ${activity}`);
  }
}

// Usage
const enrolmentInvoker: EnrolmentInvoker = new EnrolmentInvoker();
enrolmentInvoker.dispatchEnrollment("Swimming", "John");
enrolmentInvoker.dispatchEnrollment("Swimming", "Jane");
enrolmentInvoker.dispatchUnEnrollment("Swimming", "Jane");
