// @ts-ignore
class OrderManager {
  private orders: any[] = [];
  private inventory: any = {
    item1: 10,
    item2: 5,
  };

  processOrder(order: any): void {
    // Validate order
    if (!order.itemId || !order.quantity || !order.paymentInfo) {
      throw new Error("Invalid order data");
    }

    // Check inventory
    if (this.inventory[order.itemId] < order.quantity) {
      throw new Error("Insufficient inventory");
    }

    // Process payment
    console.log(`Processing payment for ${order.paymentInfo}`);

    // Update inventory
    this.inventory[order.itemId] -= order.quantity;

    // Add order to the list
    this.orders.push(order);

    // Send notification
    console.log(`Sending notification for order ${order.itemId}`);
  }

  getOrders(): any[] {
    return this.orders;
  }
}

// @ts-ignore
const orderManager = new OrderManager();
orderManager.processOrder({
  itemId: "item1",
  quantity: 2,
  paymentInfo: "credit card",
});
console.log(orderManager.getOrders());

// --- Problems with This Approach
// Multiple Responsibilities: OrderManager is responsible for order validation, inventory checking, payment processing, inventory updating, and notification.
// Difficult to Maintain: Changes in one responsibility (e.g., inventory logic) require modifying the OrderManager class.
// Difficult to Test: Testing the OrderManager class becomes more complex because it has multiple responsibilities.
