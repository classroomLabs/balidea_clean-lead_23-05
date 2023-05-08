interface LogEntry {
  public String level;
  public String message;
}

class Logger {
  public String log(LogEntry entry) {
    String message = getMessage(entry);
    switch (entry.level) {
      case "info":
        System.out.println(message);
        break;
      case "debug":
        System.out.println(message);
        break;
      case "warn":
        System.out.println(message);
        break;
      case "error":
        System.err.println(message);
        break;
      default:
        System.err.println(message);
    }
    return message;
  }
  
  private String getMessage(LogEntry entry) {
    switch (entry.level) {
      case "info":
        return "💁🏼‍♂️: " + entry.message;
      case "debug":
        return "🐾: " + entry.message;
      case "warn":
        return "⚠️: " + entry.message;
      case "error":
        return "💣: " + entry.message + " at " + java.time.LocalDateTime.now().toString();
      default:
        return "Unknown log level: " + entry.level;
    }
  }
}

class App {
  private Logger logger = new Logger();
  
  public void run() {
    logger.log(new LogEntry() {{ level = "info"; message = "App started!"; }});
    logger.log(new LogEntry() {{ level = "debug"; message = "I was here"; }});
    logger.log(new LogEntry() {{ level = "warn"; message = "Heads up"; }});
    logger.log(new LogEntry() {{ level = "error"; message = "Fatal exception"; }});
  }
}
