// ❌ Bad example not using a factory

public interface Writer {
  public void write(String message);
}
public class ConsoleWriter implements Writer {
  public void write(String message) {
    System.out.println(message);
  }
}
public class FileWriter implements Writer {
  public void write(String message) {
    System.out.println("Appending to a file", message);
  }
}
public class DatabaseWriter implements Writer {
  public void write(String message) {
    System.out.println("Inserting on a database", message);
  }
}

public class Logger {
  private Writer writer;
  
  public Logger(Writer writer) {
    this.writer = writer;
  }

  public void log(String message) {
    this.writer.write(message);
  }
}



public class Application {
  public static void main(String[] args) {
    // 😱 which implementation to use?
    Writer writer;
    // 😱 the logic is exposed and may have to be repeated in other places
    switch (System.getenv("LOGGER")) {
      case "console":
        writer = new ConsoleWriter();
        break;
      case "file":
        writer = new FileWriter();
        break;
      case "database":
        writer = new DatabaseWriter();
        break;
      default:
        throw new Error("Invalid logger");
    }
    final Logger logger = new Logger(writer);
    logger.log("Hello world!");
  }
}
