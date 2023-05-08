// ❌ Bad example not using a builder
public class Logger {
  private Formatter formatter;
  private Writer writer;

  Logger() {}

  public void setFormatter(Formatter formatter) {
    this.formatter = formatter;
  }
  public void setWriter(Writer writer) {
    if (this.formatter == null) {
      throw new RuntimeException("Need a formatter");
    }
    if (this.formatter instanceof JsonFormatter && writer instanceof DatabaseWriter) {
      throw new RuntimeException("Incompatible formatter for this writer");
    }
    this.writer = writer;
  }

  public void log(LogEntry entry) {
    if (this.writer == null || this.formatter == null) {
      throw new RuntimeException("Logger is not configured");
    }
    this.writer.write(this.formatter.format(entry));
  }
}

public class Application {
  public void main() {
    final Logger logger = new Logger();
    logger.setWriter(new FileWriter()); // 😱 throws "Need a formatter"
    logger.setFormatter(new JsonFormatter());
    logger.setWriter(new DatabaseWriter()); // 😱 throws "Incompatible formatter for this writer"
    logger.log(new LogEntry("Hello world!"));
    // 😱 you must remember to call the methods in the correct order,
    // and do it every time you need a new instance
  }
}
