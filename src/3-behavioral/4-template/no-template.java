public class EnrollActivity {
  public String execute(String destination) {
    // ! 😱 repeated steps
    String businessResult = "";
    try {
      System.out.println("ℹ️  transaction started");
      String paymentResult = "💸  Paying Activity to " + destination;
      System.out.println("ℹ️  transaction processed");
      businessResult = "✍🏼 Booking Activity " + paymentResult;
      System.out.println("ℹ️  action done");
      System.out.warn("📧 Activity booked " + businessResult);
      System.out.println("ℹ️  notification sent");
    } catch (error) {
      System.out.println("ℹ️ 😵‍💫 error: " + error);
    }
    return businessResult;
  }
}

// ToDo: cancel enrollment

// ToDo: confirm activity

public class CancelActivity {
  public String execute(String destination) {
    // ! 😱 repeated steps
    String businessResult = "";
    try {
      System.out.println("ℹ️  transaction started");
      String paymentResult = "🤑  Refunding Activity to " + destination;
      System.out.println("ℹ️  transaction processed");
      businessResult = "😭  Cancelling Activity " + paymentResult;
      System.out.println("ℹ️  action done");
      System.out.warn("✅ Done " + businessResult);
      System.out.println("ℹ️  notification sent");
    } catch (Exception error) {
      System.out.println("ℹ️ 😵‍💫 error: " + error);
    }
    return businessResult;
  }
}

public class Client {
  private EnrollActivity enrolling = new EnrollActivity();
  private CancelActivity cancel = new CancelActivity();
  public void run() {
    this.enrolling.execute("Snorkeling on the Red Sea");
    this.cancel.execute("Snorkeling on the Red Sea");
  }
}

Client client = new Client();
client.run();