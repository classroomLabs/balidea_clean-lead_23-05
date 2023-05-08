// * ✅ Bridge solution

// * IMPLEMENTOR
// * implementor interface
export interface Payment {
  pay(amount: number): string;
}
// * concrete (refined) implementor
export class PayPal implements Payment {
  public pay(amount: number): string {
    console.log(`Paid ${amount} with PaymentPal`);
    return `PayPalPaymentCode`;
  }
}
// ToDo: add new payment method

// * ABSTRACTION
// * Abstraction interface
export interface Enrolment {
  enrol(activityPrice: number, numPlaces: number): string;
}
// * abstraction using implementor interface
export abstract class EnrolmentBase implements Enrolment {
  protected payment: Payment;
  constructor(payment: Payment) {
    this.payment = payment;
  }
  public abstract enrol(activityPrice: number, numPlaces: number): string;
}
// * concrete (refined) abstraction
export class EnrolmentApp extends EnrolmentBase {
  public enrol(activityPrice: number, numPlaces: number): string {
    const amount = activityPrice * numPlaces;
    const paymentPal = new PayPal();
    const paymentCode = paymentPal.pay(amount);
    return paymentCode;
  }
}
// ToDo: add new enrolment service

export class Application {
  public static main(): void {
    // * 😏 easy to add new payment methods or new enrolment services
    const payment = new PayPal();
    const enrolment: Enrolment = new EnrolmentApp(payment);
    const paymentCode = enrolment.enrol(100, 2);
    console.log(paymentCode);
  }
}

// * ✅ Bridge solution
// IMPLEMENTOR
// * implementor interface
export interface Writer {
  write(message: string): void;
}
// * 😏 concrete (refined) implementor
export class FileWriter implements Writer {
  write(message: string): void {
    console.log(`Writing message to file: ${message}`);
  }
}
// * 😏 another concrete (refined) implementor
export class ApiWriter implements Writer {
  write(message: string): void {
    console.log(`Writing message to API: ${message}`);
  }
}

// ABSTRACTION
// * Abstraction interface
export interface Logger {
  readonly writer: Writer;
  log(message: string): void;
}
// * 😏 bridge abstraction
export abstract class LoggerBase implements Logger {
  // * 😏 wraps low-level interface
  writer: Writer;
  constructor(writer: Writer) {
    this.writer = writer;
  }
  // * 😏 exposes high-level interface
  abstract log(message: string): void;
}

// * 😏 concrete (refined) abstraction
export class LoggerApp extends LoggerBase {
  log(message: string): void {
    this.writer.write(message);
  }
}
// * 😏 another concrete (refined) abstraction
export class BrowserLoggerApp extends LoggerBase {
  log(message: string): void {
    this.writer.write(message + " " + navigator.userAgent);
  }
}
