// Notification interface
interface Notifier {
  notify(userEmail: string, message: string): void;
}

// Concrete notifier class for email notifications
class EmailNotifier implements Notifier {
  notify(userEmail: string, message: string): void {
    console.log(`Email sent to ${userEmail}: ${message}`);
  }
}

// Authentication class
class UserAuth {
  userEmail: string;
  userLoggedIn: boolean = false;
  notifier: Notifier;

  constructor(userEmail: string, notifier: Notifier) {
    this.userEmail = userEmail;
    this.notifier = notifier;
  }

  login(password: string): boolean {
    // Simulate login
    if (password === "securepassword") {
      this.userLoggedIn = true;
      this.notifier.notify(this.userEmail, "Logged in successfully.");
      return true;
    } else {
      this.notifier.notify(this.userEmail, "Failed to log in.");
      return false;
    }
  }
}

// Usage
const emailNotifier = new EmailNotifier();
const user = new UserAuth("user@example.com", emailNotifier);
user.login("securepassword"); // Log in with correct password
user.login("wrongpassword"); // Attempt to log in with wrong password
