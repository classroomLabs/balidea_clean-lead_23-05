// ! ❌ Bad example of not using a command

// The invoker
export class EnrolmentController {
  private service: EnrolmentService = new EnrolmentService();
  private paymentService: PaymentService = new PaymentService();
  // ! 😱 tight coupling invoker and receivers
  enroll(activity: string, participant: string): void {
    this.service.createEnroll(activity, participant);
    this.paymentService.pay(activity, participant);
  }
  unEnrollment(activity: string, participant: string): void {
    this.service.removeEnroll(activity, participant);
    this.paymentService.refund(activity, participant);
  }
}

// The receivers
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

export class Application {
  main(): void {
    const enrolmentController = new EnrolmentController();
    enrolmentController.enroll("surfing", "John");
    enrolmentController.unEnrollment("surfing", "John");
  }
}
