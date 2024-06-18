class UserAuthNotifier {
    userEmail: string;
    userLoggedIn: boolean = false;

    constructor(userEmail: string) {
        this.userEmail = userEmail;
    }

    login(password: string): boolean {
        // Simulate login
        if (password === "securepassword") { // Don't use this in real applications!
            this.userLoggedIn = true;
            this.notify("Logged in successfully.");
            return true;
        } else {
            this.notify("Failed to log in.");
            return false;
        }
    }

    notify(message: string): void {
        console.log(`Notification sent to ${this.userEmail}: ${message}`);
    }
}

// Usage
const user = new UserAuthNotifier("user@example.com");
user.login("securepassword");
user.login("wrongpassword");
