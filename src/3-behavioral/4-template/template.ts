// * ✅ Command solution

export interface BusinessTemplateInterface {
  execute(payload: string): string;
}

export abstract class BusinessTemplate implements BusinessTemplateInterface {
  public execute(payload: string): string {
    try {
      // * 😏 hard coded instrumentation steps
      console.log("ℹ️  transaction started");
      const paymentResult = this.processTransaction(payload);
      console.log("ℹ️  transaction processed");
      const businessResult = this.doBusinessAction(paymentResult);
      console.log("ℹ️  action done");
      this.sendNotification(businessResult);
      console.log("ℹ️  notification sent");
      return businessResult;
    } catch (error) {
      // * 😏 hard coded common step
      console.log("ℹ️ 😵‍💫 error: " + error);
      return "";
    }
  }
  // * 😏 mandatory steps
  protected abstract processTransaction(payload: string): string;
  protected abstract doBusinessAction(payload: string): string;
  // * 😏 optional step with default implementation if not overridden
  protected sendNotification(payload = ""): void {
    console.warn("✅ Done " + payload);
  }
}

// * 😏 custom implementation steps while enrollment or cancellation

export class EnrollActivity extends BusinessTemplate {
  protected processTransaction(destination: string): string {
    return "💸  Paying Activity to " + destination;
  }
  protected doBusinessAction(payment: string): string {
    return "✍🏼 Booking Activity " + payment;
  }
  protected override sendNotification(booking: string): void {
    console.warn("📧 Activity booked " + booking);
  }
}

export class CancelActivity extends BusinessTemplate {
  protected processTransaction(destination: string): string {
    return "🤑  Refunding Activity " + destination;
  }
  protected override doBusinessAction(refund: string): string {
    return "😭  Cancelling Activity " + refund;
  }
}

export class Client {
  // * 😏 you can depend on abstraction not implementation
  private enrolling: BusinessTemplateInterface = new EnrollActivity();
  private cancel: BusinessTemplate = new CancelActivity();
  public run(): void {
    this.enrolling.execute("Snorkeling on the Red Sea");
    this.cancel.execute("Snorkeling on the Red Sea");
  }
}

const client = new Client();
client.run();
