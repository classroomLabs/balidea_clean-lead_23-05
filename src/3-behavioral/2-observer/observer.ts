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

  subscribe(eventName: string, listener: Observer): void {
    let handlers = this.subscriptions.get(eventName);
    if (!handlers) {
      handlers = [];
      this.subscriptions.set(eventName, handlers);
    }
    handlers.push(listener);
  }

  unsubscribe(eventName: string, listener: Observer): void {
    const handlers = this.subscriptions.get(eventName);
    if (handlers) {
      const index = handlers.indexOf(listener);
      handlers.splice(index, 1);
    }
  }

  publish(eventName: string, eventArgs: object): void {
    const handlers = this.subscriptions.get(eventName);
    if (handlers) {
      handlers.forEach(handler => handler(eventArgs));
    }
  }
}

// * 😏 the logger is an observer
interface LoggerObserver {
  log: Observer;
}
class Logger implements LoggerObserver {
  log(data: object): void {
    console.log(data);
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
    agency.subscribe("booking-created", logger.log);
    agency.addBooking({ trip: "Paris", price: 100 });
  }
}
