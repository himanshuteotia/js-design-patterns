class OrderValidator {
  validate(order: any): void {
    if (!order.itemId || !order.quantity || !order.paymentInfo) {
      throw new Error("Invalid order data");
    }
  }
}

class InventoryManager {
  private inventory: any = {
    item1: 10,
    item2: 5,
  };

  checkInventory(itemId: string, quantity: number): void {
    if (this.inventory[itemId] < quantity) {
      throw new Error("Insufficient inventory");
    }
  }

  updateInventory(itemId: string, quantity: number): void {
    this.inventory[itemId] -= quantity;
  }
}

class PaymentProcessor {
  processPayment(paymentInfo: string): void {
    console.log(`Processing payment for ${paymentInfo}`);
  }
}

class NotificationService {
  sendNotification(orderId: string): void {
    console.log(`Sending notification for order ${orderId}`);
  }
}
// @ts-ignore
class OrderManager {
  private orders: any[] = [];
  private validator: OrderValidator;
  private inventoryManager: InventoryManager;
  private paymentProcessor: PaymentProcessor;
  private notificationService: NotificationService;

  constructor(
    validator: OrderValidator,
    inventoryManager: InventoryManager,
    paymentProcessor: PaymentProcessor,
    notificationService: NotificationService
  ) {
    this.validator = validator;
    this.inventoryManager = inventoryManager;
    this.paymentProcessor = paymentProcessor;
    this.notificationService = notificationService;
  }

  processOrder(order: any): void {
    // Validate order
    this.validator.validate(order);

    // Check inventory
    this.inventoryManager.checkInventory(order.itemId, order.quantity);

    // Process payment
    this.paymentProcessor.processPayment(order.paymentInfo);

    // Update inventory
    this.inventoryManager.updateInventory(order.itemId, order.quantity);

    // Add order to the list
    this.orders.push(order);

    // Send notification
    this.notificationService.sendNotification(order.itemId);
  }

  getOrders(): any[] {
    return this.orders;
  }
}

// Create instances of the services
const orderValidator = new OrderValidator();
const inventoryManager = new InventoryManager();
const paymentProcessor = new PaymentProcessor();
const notificationService = new NotificationService();

// Inject dependencies into OrderManager
// @ts-ignore
const orderManager = new OrderManager(
  orderValidator,
  inventoryManager,
  paymentProcessor,
  notificationService
);

// Process an order
orderManager.processOrder({
  itemId: "item1",
  quantity: 2,
  paymentInfo: "credit card",
});

// Get and log orders
console.log(orderManager.getOrders());
