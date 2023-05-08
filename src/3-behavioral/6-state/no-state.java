public class ActivityEnrollment {
  private ActivityEnrollmentStateType state;
  public ActivityEnrollment(ActivityEnrollmentStateType state) {
    this.state = state;
  }
  public Object execute(Object data) {
    switch (this.state) {
      case Paying:
        return "payment done : " + data;
      case Booking:
        return "booking done : " + data;
      case Cancelling:
        return "cancelling done : " + data;
    }
  }
}

enum ActivityEnrollmentStateType {
  Paying, Booking, Cancelling
}