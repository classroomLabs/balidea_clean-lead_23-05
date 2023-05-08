// ! ❌ Bad example not using a command

public class LightBulb {
  private boolean isOn = false;
  private int brightness = 0;

  // 😏 a business class not aware of the command pattern
  // nothing to see here

  public void turnOn(int brightness) {
    this.isOn = true;
    this.brightness = brightness;
    System.out.println("Light turned on, brightness " + this.brightness);
  }

  public void turnOff() {
    this.isOn = false;
    this.brightness = 0;
    System.out.println("Light turned off, brightness " + this.brightness);
  }
}

public class RemoteControl {
  // ! 😱 tight coupling with the light bulb
  private LightBulb lightBulb;

  public RemoteControl(LightBulb lightBulb) {
    this.lightBulb = lightBulb;
  }

  public void pressOnButton(int brightness) {
    lightBulb.turnOn(brightness);
  }

  public void pressOffButton() {
    lightBulb.turnOff();
  }
}

// Usage
LightBulb lightBulb = new LightBulb();
RemoteControl remoteControl = new RemoteControl(lightBulb);
remoteControl.pressOnButton(20); // Light turned on, brightness 20
remoteControl.pressOffButton(); // Light turned off, brightness 0
