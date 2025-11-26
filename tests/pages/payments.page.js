import { expect, test } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;

    // ===== Fixed locators =====
    this.root = page.getByTestId("store-page");
    this.paymentTab = page.getByTestId("store-tab-payment");
    this.title = page.getByTestId("payment-title");
    this.emptyMessage = page.getByTestId("payment-empty-message");
    this.paymentTotalValue = page.getByTestId("payment-total-value");
    this.paymentMethodMbway = page.getByTestId("payment-method-input-MBWay");
    this.paymentMethodMKlarna = page.getByTestId("payment-method-input-Klarna");
    this.paymentMethodMultibanco = page.getByTestId("payment-method-input-Multibanco");
    this.paymentMethodPaypal = page.getByTestId("payment-method-input-Paypal");
    this.paymentMethodVisa = page.getByTestId("payment-method-input-Visa");
    this.confirmPaymentButton = page.getByTestId("payment-confirm-button");
  }

  // ===== Dynamic locators (by ID) =====

  paymentItem(id) {
    return this.page.getByTestId(`payment-cart-item-${id}`);
  }

  paymentItemName(id) {
    return this.page.getByTestId(`payment-item-name-${id}`);
  }

  paymentItemPriceValue(id) {
    return this.page.getByTestId(`payment-item-price-value-${id}`);
  }

  paymentItemQuantity(id) {
    return this.page.getByTestId(`payment-item-quantity-${id}`);
  }

  paymentItemTotalValue(id) {
    return this.page.getByTestId(`payment-item-total-value-${id}`);
  }

  paymentAllItemsTotalValue() {
    return this.page.$$('[data-testid^="payment-item-total-value-"]');
  }
  
  paymentMethod(pay) {
    return this.page.getByTestId(`payment-method-input-${pay}`);
  }

  // -----------------------

  async reviewPaymentSummary(id, name, price, quantity) {
    await test.step(`Review Payment item list`, async () => {
      const total = Number(price) * Number(quantity);
      const totalFixed = total.toFixed(2);

      await expect(this.paymentItem(id)).toBeVisible();
      await expect(this.paymentItemName(id)).toHaveText(name);
      await expect(this.paymentItemPriceValue(id)).toHaveText(price);
      await expect(this.paymentItemQuantity(id)).toHaveText(quantity);
      await expect(this.paymentItemTotalValue(id)).toHaveText(totalFixed);
    });
  }

  async reviewPaymentTotalValue() {
    await test.step("Total Payment value reviewed", async () => {
      const itemsTotal = await this.paymentAllItemsTotalValue();
      let paymentTotal = 0;
      for (const item of itemsTotal) {
        const value = await item.textContent();
        paymentTotal += parseFloat(value);
      }
      const paymentTotalFixed = paymentTotal.toFixed(2);
      await expect(this.paymentTotalValue).toHaveText(paymentTotalFixed);
    });
  }

  async selecPaymentMethod(pay) {
    await test.step(`Select payment method: ${pay}`, async () => {
      await this.paymentMethod(pay).click();
    });
  }

  async clickConfirmPayment() {
    await test.step(`Click "Confirm Payment" button`, async () => {
      await this.confirmPaymentButton.click();
      await expect(this.page.getByTestId("orders-title")).toBeVisible();
    });
  }
}
