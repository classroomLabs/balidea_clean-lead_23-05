// * ✅ State solution
type ActivityEnrollmentStateType = "Paying" | "Enrolling" | "Cancelling";

// *  😏 an interface with the contract
export interface ActivityEnrollmentState {
  state: ActivityEnrollmentStateType;
  pay(data: unknown): ActivityEnrollmentState;
  enroll(data: unknown): ActivityEnrollmentState;
  cancel(data: unknown): ActivityEnrollmentState;
}

// * 😏 a base class with the default implementation (in this case avoids invalid calls)
export abstract class ActivityEnrollmentStateBase implements ActivityEnrollmentState {
  abstract state: ActivityEnrollmentStateType;
  pay(data: unknown): ActivityEnrollmentState {
    throw new Error("Invalid in current state.");
  }
  enroll(data: unknown): ActivityEnrollmentState {
    throw new Error("Invalid in current state.");
  }
  cancel(data: unknown): ActivityEnrollmentState {
    throw new Error("Invalid in current state.");
  }
}

export class BookingState extends ActivityEnrollmentStateBase {
  state: ActivityEnrollmentStateType = "Enrolling";
  enroll(data: unknown): ActivityEnrollmentState {
    console.log("booking done : " + data);
    return new PayingState();
  }
}

export class PayingState extends ActivityEnrollmentStateBase {
  state: ActivityEnrollmentStateType = "Paying";
  pay(data: unknown): ActivityEnrollmentState {
    console.log("payment done : " + data);
    return new CancellingState();
  }
}

export class CancellingState extends ActivityEnrollmentStateBase {
  state: ActivityEnrollmentStateType = "Cancelling";
  cancel(data: unknown): ActivityEnrollmentState {
    console.log("cancelling done : " + data);
    return new BookingState();
  }
}

export class ActivityEnrollment {
  main() {
    let enrollmentState: ActivityEnrollmentState;
    let enrollment = { activity: "surfing", places: 2, amount: 100 };
    enrollmentState = new BookingState();
    enrollmentState.enroll(enrollment.places).pay(enrollment.amount).cancel(enrollment.activity);
    // enrollmentState = enrollmentState.enroll(enrollment.places);
    // enrollmentState = enrollmentState.pay(enrollment.amount);
    // enrollmentState = enrollmentState.cancel(enrollment.activity);
    // not allowed in any other order
    enrollmentState = enrollmentState.cancel(enrollment.activity);
    enrollmentState = enrollmentState.pay(enrollment.amount);
    enrollmentState = enrollmentState.enroll(enrollment.places);
  }
}
