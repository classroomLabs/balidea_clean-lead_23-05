import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface Observer {
    void update(Object data);
}

public interface Observable {
    void subscribe(String eventName, Observer observer);
    void unsubscribe(String eventName, Observer observer);
    void publish(String eventName, Object eventArgs);
}

public class EventBus implements Observable {
    private Map<String, List<Observer>> subscriptions = new HashMap<>();

    public void subscribe(String eventName, Observer observer) {
        List<Observer> handlers = subscriptions.get(eventName);
        if (handlers == null) {
            handlers = new ArrayList<>();
            subscriptions.put(eventName, handlers);
        }
        handlers.add(observer);
    }

    public void unsubscribe(String eventName, Observer observer) {
        List<Observer> handlers = subscriptions.get(eventName);
        if (handlers != null) {
            handlers.remove(observer);
        }
    }

    public void publish(String eventName, Object eventArgs) {
        List<Observer> handlers = subscriptions.get(eventName);
        if (handlers != null) {
            for (Observer handler : handlers) {
                handler.update(eventArgs);
            }
        }
    }
}
