// * ✅ Factory solution
import { ConsoleWriter, DatabaseWriter, FileWriter, Logger, Writer } from "./factory.dependencies";

// * 😏 factory method encapsulates the logic to create the right instance
export function createWriter(): Writer {
  // * 😏 if the criteria change, we only need to change the factory
  switch (process.env.LOGGER || "console") {
    case "console":
      return new ConsoleWriter();
    case "file":
      return new FileWriter();
    case "database":
      return new DatabaseWriter();
    default:
      throw new Error("Invalid logger");
  }
  /*
    ToDo: ☣️ Disclaimer: Yes, you should avoid using 🤮 switch statements, 
    but at least having only one is better than having it in multiple places 
    and promote you to refactor it.
   */
}
class Application {
  main() {
    // * 😏 consumer does not need to know the logic
    const writer = createWriter();
    const logger = new Logger(writer);
    logger.log("Hello world!");
  }
}
