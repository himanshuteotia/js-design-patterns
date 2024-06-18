// Example 1: Extensible Reporting System
// Define an abstract class or interface for report generation
interface ReportGenerator {
  generateReport(data: any): string;
}

// Concrete implementation for a text report
class TextReportGenerator implements ReportGenerator {
  generateReport(data: any): string {
    return `Report Data: ${JSON.stringify(data)}`;
  }
}

// Concrete implementation for an HTML report
class HTMLReportGenerator implements ReportGenerator {
  generateReport(data: any): string {
    return `<html><body><h1>Report</h1><p>${JSON.stringify(
      data
    )}</p></body></html>`;
  }
}

// ReportManager doesn't need to change when new report types are added
class ReportManager {
  private generator: ReportGenerator;

  constructor(generator: ReportGenerator) {
    this.generator = generator;
  }

  public createReport(data: any): string {
    return this.generator.generateReport(data);
  }
}

// Usage
const textReport = new ReportManager(new TextReportGenerator());
console.log(textReport.createReport({ sales: 100, profit: 50 }));

const htmlReport = new ReportManager(new HTMLReportGenerator());
console.log(htmlReport.createReport({ sales: 150, profit: 75 }));

// Example 2 : Payment method interface
interface PaymentMethod {
  processPayment(amount: number): void;
}

// Implementation for PayPal
class PayPalPayment implements PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processing a payment of $${amount} via PayPal.`);
  }
}

// Implementation for Credit Card
class CreditCardPayment implements PaymentMethod {
  processPayment(amount: number): void {
    console.log(`Processing a payment of $${amount} via Credit Card.`);
  }
}

// Payment Processor handles payments and is closed for modification
class PaymentProcessor {
  private paymentMethod: PaymentMethod;

  constructor(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public pay(amount: number): void {
    this.paymentMethod.processPayment(amount);
  }
}

// Usage
const paypalPayment = new PaymentProcessor(new PayPalPayment());
paypalPayment.pay(100);

const creditCardPayment = new PaymentProcessor(new CreditCardPayment());
creditCardPayment.pay(200);
