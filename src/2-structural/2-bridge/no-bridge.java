public class PayPal {
  public String pay(int amount) {
    System.out.println("Paid " + amount + " with PaymentPal");
    return "PayPalPaymentCode";
  }
}

public class EnrolmentApp {
  // ! 🤢 The abstraction is coupled to the implementation
  public String enrol(int activityPrice, int numPlaces) {
    int amount = activityPrice * numPlaces;
    PayPal paymentPal = new PayPal();
    String paymentCode = paymentPal.pay(amount);
    return paymentCode;
  }
}

public class Application {
  public static void main(String[] args) {
    // ! 😱 We also want to work with Stripe (no easy way to do it)
    // ! 😱 We also want to accept enrollments via API (no easy way to do it)
    EnrolmentApp enrolmentApp = new EnrolmentApp();
    String paymentCode = enrolmentApp.enrol(100, 2);
    System.out.println(paymentCode);
  }
}