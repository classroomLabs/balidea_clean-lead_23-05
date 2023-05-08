// ! ❌ Bad example not using decorator
public class Enrolment {
  public String enrol(String activityId, String customerId, int numPlaces) {
    String enrollment = String.format("Enrolled %s in %s with %d places", customerId, activityId, numPlaces);
    System.out.println(enrollment);
    return enrollment;
  }
  // ToDo: 😱 add cancellation new functionality
}