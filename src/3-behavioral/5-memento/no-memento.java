public class Activity {
  private String title;
  private List<String> attendees = new ArrayList<>();
  private int places;

  // Suppose more state is added to the Activity class(money, date, etc.)

  public Activity(String title, int places) {
    this.title = title;
    this.places = places;
  }

  public int availablePlaces() {
    return this.places - this.attendees.size();
  }
  public void enroll(String name) {
    if (this.attendees.size() >= this.places) {
      throw new Error("No more places available on " + this.title);
    }
    this.attendees.add(name);
  }
  public void cancel() {
    if (this.attendees.size() == 0) {
      return;
    }
    this.attendees.pop();
  }
}