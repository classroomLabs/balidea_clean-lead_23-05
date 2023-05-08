import java.util.Date;

public class Client {
  // ToDo: 🤢 client classes depending on concrete implementations
  private CommonEventService logger;

  public Client() {
    // ToDo: 🤢 client classes are coupled to the library
    logger = new CommonEventService();
  }

  public void doThings() {
    // ToDo: 🤢 client classes are coupled to the interface
    CommonEvent event = new CommonEvent(new Date(), "localhost", "myApp", 0, new String[] {"msg=Hello World"});
    LogMessage message = logger.createMessage(event);
    logger.writeMessage(message);
  }
}
