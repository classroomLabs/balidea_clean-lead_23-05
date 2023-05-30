// * ✅ State solution
type ActivityEnrollmentStateType = "Paying" | "Booking" | "Cancelling";
export interface ActivityEnrollmentProcessor {
  state: ActivityEnrollmentStateType;
  process(data: unknown): unknown;
}

export class PayingProcessor implements ActivityEnrollmentProcessor {
  state: ActivityEnrollmentStateType = "Paying";
  process(data: unknown) {
    return "payment done : " + data;
  }
}

export class BookingProcessor implements ActivityEnrollmentProcessor {
  state: ActivityEnrollmentStateType = "Booking";
  process(data: unknown) {
    return "booking done : " + data;
  }
}

export class CancellingProcessor implements ActivityEnrollmentProcessor {
  state: ActivityEnrollmentStateType = "Cancelling";
  process(data: unknown) {
    return "cancelling done : " + data;
  }
}

export class ActivityEnrollment {
  main() {
    let enrollmentProcessor: ActivityEnrollmentProcessor;
    let enrollment = { activity: "surfing", places: 2, amount: 100 };
    enrollmentProcessor = new BookingProcessor();
    enrollmentProcessor.process(enrollment.places);
    enrollmentProcessor = new PayingProcessor();
    enrollmentProcessor.process(enrollment.amount);
    enrollmentProcessor = new CancellingProcessor();
    enrollmentProcessor.process(enrollment.activity);
  }
}
