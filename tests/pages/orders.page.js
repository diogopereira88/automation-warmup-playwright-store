import { expect, test } from "@playwright/test";

export class OrderPage {
  constructor(page) {
    this.page = page;

    this.root = page.getByTestId("store-page");
    this.orderTab = page.getByTestId("store-tab-orders");
    this.title = page.getByTestId("orders-title");
    this.emptyMessage = page.getByTestId("orders-empty-message");
  }

  // -----------------------

  orderNumber(id) {
    return this.page.getByTestId(`order-${id}`);
  }

  orderItemName(id) {
    return this.page.getByTestId(`order-item-name-0-${id}`);
  }

  orderItemTotalValue(id) {
    return this.page.getByTestId(`order-item-total-value-0-${id}`);
  }

  orderItemQuantity(id) {
    return this.page.getByTestId(`order-item-name-0-${id}`);
  }

  orderTotalValue(id) {
    return this.page.getByTestId(`order-total-value-${id}`);
  }

  orderPaymentMethod(id) {
    return this.page.getByTestId(`order-payment-${id}`);
  }

  orderAllItemsTotalValue() {
    return this.page.$$('[data-testid^="order-item-total-value-"]');
  }

  orderItemDate(id) {
    return this.page.getByTestId(`order-date-${id}`);
  }

  // -----------------------

  async displayPreviousOrder(id) {
    await test.step("Assert previous purchase is visible in Orders page", async () => {
      await expect(this.orderNumber(id)).toBeVisible();
    });
  }

  async orderDate() {
    return await test.step("Get purchase date", async () => {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    });
  }

  async reviewOrderDetails(id, name, quantity, pay) {
    await test.step(`Review Order item details`, async () => {
      const date = await this.orderDate();
      await expect(this.orderItemName(id)).toContainText(name);
      await expect(this.orderItemQuantity(id)).toContainText(quantity);
      await expect(this.orderPaymentMethod(id)).toContainText(pay);
      await expect(this.orderItemDate(id)).toContainText(date);
    });
  }

  async reviewOrderTotalValue(id) {
    await test.step("Total Order value reviewed", async () => {
      const itemsTotal = await this.orderAllItemsTotalValue();
      let orderTotal = 0;
      for (const item of itemsTotal) {
        const value = await item.textContent();
        orderTotal += parseFloat(value);
      }
      const orderTotalFixed = orderTotal.toFixed(2);
      await expect(this.orderTotalValue(id)).toHaveText(orderTotalFixed);
    });
  }
}
