// The Proxy Pattern is a structural design pattern that provides an object representing another object.
// This proxy controls access to the original object, allowing it to perform tasks such as lazy initialization, access control, logging, and handling expensive operations before or after the request gets through to the original object.
class BankAccount {
    constructor(balance = 0) {
      this.balance = balance;
    }
  
    deposit(amount) {
      this.balance += amount;
      console.log(`Deposited $${amount}, balance is now $${this.balance}`);
    }
  
    withdraw(amount) {
      if (amount <= this.balance) {
        this.balance -= amount;
        console.log(`Withdrew $${amount}, balance is now $${this.balance}`);
      } else {
        console.log('Insufficient funds');
      }
    }
  
    getBalance() {
      return this.balance;
    }
  }
  
  // Proxy for BankAccount
  class BankAccountProxy {
    constructor(account) {
      this.account = account;
    }
  
    deposit(amount) {
      // Additional security checks
      if (this.validateAccess()) {
        this.account.deposit(amount);
      }
    }
  
    withdraw(amount) {
      if (this.validateAccess()) {
        this.account.withdraw(amount);
      }
    }
  
    getBalance() {
      if (this.validateAccess()) {
        return this.account.getBalance();
      } else {
        return null;
      }
    }
  
    validateAccess() {
      // Assume some authentication logic here
      // For simplicity, it just returns true
      console.log('Access granted');
      return true;
    }
  }
  
  // Usage
  const realAccount = new BankAccount(100);
  const proxyAccount = new BankAccountProxy(realAccount);
  
  proxyAccount.deposit(50);
  proxyAccount.withdraw(30);
  console.log(`Current balance: $${proxyAccount.getBalance()}`);
  