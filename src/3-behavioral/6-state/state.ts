// * ✅ State solution
export interface ActivityEnrollmentState {
  onChange(): void;
  execute(data: unknown): unknown;
}

export class PayingState implements ActivityEnrollmentState {
  onChange() {
    // * 😏 do something
  }
  execute(data: unknown) {
    return "payment done : " + data;
  }
}

export class BookingState implements ActivityEnrollmentState {
  onChange() {
    // * 😏 do something
  }
  execute(data: unknown) {
    return "booking done : " + data;
  }
}

export class CancellingState implements ActivityEnrollmentState {
  onChange() {
    // * 😏 do something
  }
  execute(data: unknown) {
    return "cancelling done : " + data;
  }
}

export class ActivityEnrollment {
  main() {
    let enrollmentProcessor: ActivityEnrollmentState;
    let enrollment = { activity: "surfing", places: 2, amount: 100 };
    enrollmentProcessor = new BookingState();
    enrollmentProcessor.execute(enrollment.places);
    enrollmentProcessor = new PayingState();
    enrollmentProcessor.execute(enrollment.amount);
    enrollmentProcessor = new CancellingState();
    enrollmentProcessor.execute(enrollment.activity);
  }
}
