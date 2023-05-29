// ! ❌ Bad example not using a state

type ActivityEnrollmentStateType = "Paying" | "Booking" | "Cancelling";

export class ActivityEnrollment {
  state: ActivityEnrollmentStateType = "Booking";

  execute(enrollment: unknown): unknown {
    switch (this.state) {
      case "Paying":
        return "payment done : " + enrollment;
      case "Booking":
        return "booking done : " + enrollment;
      case "Cancelling":
        return "cancelling done : " + enrollment;
    }
  }
}
