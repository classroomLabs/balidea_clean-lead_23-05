// * ✅ Observer solution

// * 😏 the observer contract is a function used as a listener or callback
type Observer = (data: object) => void;

// * 😏 the observable contract is a set of methods to subscribe, unsubscribe and publish events
interface Observable {
  subscribe(eventName: string, observer: Observer): void;
  unsubscribe(eventName: string, observer: Observer): void;
  publish(eventName: string, eventArgs: object): void;
}

// * 😏 the event bus implements the observable contract
export class EventBus implements Observable {
  private subscriptions: Map<string, Observer[]> = new Map();

  subscribe(eventName: string, observer: Observer): void {
    let eventObservers = this.subscriptions.get(eventName);
    if (!eventObservers) {
      eventObservers = [];
      this.subscriptions.set(eventName, eventObservers);
    }
    eventObservers.push(observer);
  }

  unsubscribe(eventName: string, observer: Observer): void {
    const eventObservers = this.subscriptions.get(eventName);
    if (!eventObservers) return;
    const index = eventObservers.indexOf(observer);
    eventObservers.splice(index, 1);
  }

  publish(eventName: string, eventArgs: object): void {
    const eventObservers = this.subscriptions.get(eventName);
    if (!eventObservers) return;
    eventObservers.forEach((handler) => handler(eventArgs));
  }
}

// * 😏 the logger is an observer
interface LoggerObserver {
  onBookingCreated: Observer;
}
class Logger implements LoggerObserver {
  onBookingCreated: Observer = (data: object) => {
    this.log(`Booking created: ${JSON.stringify(data)}`);
  };
  log(message: string): void {
    console.log(message);
  }
}

// * 😏 the agency is an observable
class Agency extends EventBus implements Observable {
  private bookings: object[] = [];

  addBooking(booking: object) {
    this.bookings.push(booking);
    this.publish("booking-created", booking);
  }
}

// * 😏 the application can subscribe the logger to agency events
export class App {
  main() {
    const agency = new Agency();
    const logger = new Logger();
    // * 😏 agency and logger are unrelated
    agency.subscribe("booking-created", logger.onBookingCreated);
    agency.addBooking({ trip: "Paris", price: 100 });
  }
}
