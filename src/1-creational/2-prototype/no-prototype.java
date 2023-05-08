// ❌ Bad example of not using a prototype
public class Activity {
  public String title;
  public Boolean allowsChildren;
  public int price;
  public Date date;

  public Activity(String title, Boolean allowsChildren, int price, Date date) {
    this.title = title;
    this.allowsChildren = allowsChildren;
    this.price = price;
    this.date = date;
  }
}

Activity activity = new Activity("Diving", true, 100, new Date(2025, 2, 7));
// 😱 creating a new instance but the similar instance is a painful and error-prone task
Activity activity2 = new Activity(activity.title, activity.allowsChildren, activity.price, new Date(2026, 1, 8));