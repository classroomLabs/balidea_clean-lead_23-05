// ! ❌ Bad example not using a command

// The invoker
export class EnrolmentController {
  private service: EnrolmentService = new EnrolmentService();
  private paymentService: PaymentService = new PaymentService();
  // ! 😱 tight coupling invoker and receiver
  enroll(activity: string, participant: string): void {
    //console.log(`Enrolling ${participant} in ${activity}`);
    this.service.enroll(activity, participant);
    this.paymentService.pay(activity, participant);
  }
  unEnrollment(activity: string, participant: string): void {
    this.service.unenroll(activity, participant);
    this.paymentService.refund(activity, participant);
  }
}

// The receiver
export class EnrolmentService {
  enroll(activity: string, participant: string): void {
    console.log(`Enrolling ${participant} in ${activity}`);
  }

  unenroll(activity: string, participant: string): void {
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

export interface Command {
  command: string;
  execute(): void;
}

export class EnrolmentFacade {
  private service: EnrolmentService = new EnrolmentService();
  private paymentService: PaymentService = new PaymentService();
  enroll(activity: string, participant: string): void {
    this.service.enroll(activity, participant);
    this.paymentService.pay(activity, participant);
  }
  unenroll(activity: string, participant: string): void {
    this.service.unenroll(activity, participant);
    this.paymentService.refund(activity, participant);
  }
}

export class EnrollCommand implements Command {
  public command = "Enroll";
  private receiver: EnrolmentFacade = new EnrolmentFacade();

  constructor(public data: { participant: string; activity: string }) {}

  execute(): void {
    this.receiver.enroll(this.data.activity, this.data.participant);
    //console.log(`Enrolling ${this.data.participant} in ${this.data.activity}`);
  }
}

export class UnEnrollCommand implements Command {
  public command = "UnEnroll";
  private receiver: EnrolmentFacade = new EnrolmentFacade();
  constructor(public data: { participant: string; activity: string }) {}
  execute(): void {
    this.receiver.unenroll(this.data.activity, this.data.participant);
  }
  undo(): void {
    this.receiver.enroll(this.data.activity, this.data.participant);
  }
  redo(): void {
    this.execute();
  }
}

interface CommandState {
  previousState: any;
  currentState: any;
  command: Command;
}

export class CommandProcessor {
  history: Command[] = [];
  dispatch(command: Command): void {
    this.history.push(command);
    console.log("CommandProcessor: Dispatching command", command);
    command.execute();
    console.log("CommandProcessor: Command dispatched", command);
  }
}
