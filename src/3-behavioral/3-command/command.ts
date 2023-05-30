// * ✅ Command solution

// *  😏 The receivers remain the same, but...
export class EnrolmentService {
  createEnroll(activity: string, participant: string): void {
    console.log(`Enrolling ${participant} in ${activity}`);
  }

  removeEnroll(activity: string, participant: string): void {
    console.log(`Un-enrolling ${participant} in ${activity}`);
  }
}

export class PaymentService {
  pay(activity: string, participant: string): void {
    console.log(`Paying ${participant} for ${activity}`);
  }
  refund(activity: string, participant: string): void {
    console.log(`Refunding ${participant} for ${activity}`);
  }
}
// *  😏 use an interface and...
export interface Enrolment {
  participant: string;
  activity: string;
}
// *  😏 ... a Facade to wrap the receivers
export class EnrolmentFacade {
  private service: EnrolmentService = new EnrolmentService();
  private paymentService: PaymentService = new PaymentService();

  enroll(enrollment: Enrolment): void {
    this.service.createEnroll(enrollment.activity, enrollment.participant);
    this.paymentService.pay(enrollment.activity, enrollment.participant);
  }
  unenroll(enrollment: Enrolment): void {
    this.service.removeEnroll(enrollment.activity, enrollment.participant);
    this.paymentService.refund(enrollment.activity, enrollment.participant);
  }
}

// *  😏 The command interface

export interface Command<T> {
  command: string;
  payload: T;
  execute(): void;
}

// { command: 'Enroll', payload: { participant: 'John', activity: 'surfing' }

// <xml>
//   <command>Enroll</command>
//   <payload>
//     <participant>John</participant>
//     <activity>surfing</activity>
//   </payload>
// </xml>

// command | payload
// -----------------
// Enroll  | { participant: 'John', activity: 'surfing' }

// *  😏 abstract command class specifying the receiver and type of payload
export abstract class AbstractCommand implements Command<Enrolment> {
  protected receiver: EnrolmentFacade = new EnrolmentFacade();
  abstract command: string;
  abstract payload: Enrolment;
  abstract execute(): void;
}

// *  😏 concrete commands calling the receiver

export class EnrollCommand extends AbstractCommand {
  command = "Enroll";
  payload: Enrolment;
  constructor(payload: Enrolment) {
    super();
    this.payload = payload;
  }
  execute(): void {
    super.receiver.enroll(this.payload);
  }
}

export class UnenrollCommand extends AbstractCommand {
  command = "Unenroll";
  constructor(public payload: Enrolment) {
    super();
  }
  execute(): void {
    super.receiver.unenroll(this.payload);
  }
}

export class CommandProcessor {
  history: AbstractCommand[] = [];

  dispatch(command: AbstractCommand): void {
    console.log("CommandProcessor: Dispatching command", command);
    command.execute();
    this.history.push(command);
    this.serialize(command);
    console.log("CommandProcessor: Command dispatched", command);
  }

  serialize(command: AbstractCommand): void {
    console.log("CommandProcessor: Serializing command", command);
    const serialization = JSON.stringify(command);
    console.log("CommandProcessor: Serialized command", serialization);
  }

  deserializeFactory(serialization: string): AbstractCommand {
    const commandData = JSON.parse(serialization);

    switch (commandData.command) {
      case "Enroll":
        return new EnrollCommand(commandData.payload);
      case "Unenroll":
        return new UnenrollCommand(commandData.payload);
      default:
        throw new Error("Unknown command");
    }
  }
}

export class Application {
  main(): void {
    const processor = new CommandProcessor();
    const enrollCommand = new EnrollCommand({ participant: "John", activity: "surfing" });
    const unenrollCommand = new UnenrollCommand({ participant: "John", activity: "surfing" });
    processor.dispatch(enrollCommand);
    processor.dispatch(unenrollCommand);
  }
}
