class Logger {
  private List<String> entries = new ArrayList<>();
  public void log(String message) {
    this.entries.add(message);
    System.out.println(message);
  }
}
class Application {
  Logger logger = new Logger();
  public void main() {
    this.logger.log("Hello world!");
    // 🤢 dependency hell, remember to pass the instance down the chain
    Service service = new Service(this.logger);
    service.doSomething();
  }
}
class Service {
  private Logger logger;
  public Service(Logger logger) {
    this.logger = logger;
  }
  public void doSomething() {
    this.logger.log("Doing something...");
    Repository repository = new Repository();
    repository.save(new User(""));
  }
}
class Repository {
  // 😱 another instance, potentially different from the one in Application
  Logger logger = new Logger();
  public void save(User user) {
    this.logger.log("Saving user..." + user);
  }
}
class User {
  private String name;
  public User(String name) {
    this.name = name;
  }
}