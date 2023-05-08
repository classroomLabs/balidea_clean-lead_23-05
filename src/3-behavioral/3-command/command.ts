// * ✅ Command solution

// * 😏 Command interface
export interface Command {
  execute(args?: unknown): void;
  undo(): void;
}

// * 😏 Concrete command class 1
export class LightOnCommand implements Command {
  constructor(private lightBulb: LightBulb) {}

  execute(args?: number): void {
    this.lightBulb.turnOn(args);
  }

  undo(): void {
    this.lightBulb.turnOff();
  }
}

// * 😏 Concrete command class 2
export class LightOffCommand implements Command {
  constructor(private lightBulb: LightBulb) {}

  execute(): void {
    this.lightBulb.turnOff();
  }

  undo(): void {
    this.lightBulb.turnOn();
  }
}

// * 😏 Invoker class
export class RemoteControl {
  private onCommand: Command;
  private offCommand: Command;

  // ToDo: ad history of commands
  // ToDo: add serialization/deserialization for later or remote use

  setOnCommand(command: Command): void {
    this.onCommand = command;
  }

  setOffCommand(command: Command): void {
    this.offCommand = command;
  }

  pressOnButton(brightness: number): void {
    this.onCommand.execute(brightness);
  }

  pressOffButton(): void {
    this.offCommand.execute();
  }
}

// * 😏 Receiver class
export class LightBulb {
  private isOn = false;
  private brightness = 0;

  // * 😏 a business class not aware of the command pattern

  turnOn(brightness = 10): void {
    this.isOn = true;
    this.brightness = brightness;
    console.log("Light turned on, brightness", this.brightness);
  }

  turnOff(): void {
    this.isOn = false;
    this.brightness = 0;
    console.log("Light turned off, brightness", this.brightness);
  }
}

// Usage
const lightBulb = new LightBulb();
const remoteControl = new RemoteControl();
const lightOnCommand = new LightOnCommand(lightBulb);
const lightOffCommand = new LightOffCommand(lightBulb);
remoteControl.setOnCommand(lightOnCommand);
remoteControl.setOffCommand(lightOffCommand);
remoteControl.pressOnButton(6); // prints "Light turned on, brightness" 6
remoteControl.pressOffButton(); // prints "Light turned off, brightness" 0
