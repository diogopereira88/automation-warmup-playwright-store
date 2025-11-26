import { test, expect } from "@playwright/test";
import { PRODUCTS, PAYMENT_METHODS } from "./data/store.data";
import { StorePage } from "./pages/store.page";

test.describe("Cart", () => {
  test("Cart - Display Cart items (if any)", async ({ page }) => {
    const store = new StorePage(page);
    const { id, name, price, quantity } = PRODUCTS.lightSaber;
    await store.addProductToCart(id, name, price, quantity);
  });

  test("Cart - Calculate Cart total and proceed to Payments", async ({
    page,
  }) => {
    const store = new StorePage(page);
    const { id, quantity } = PRODUCTS.lightSaber;
    await store.validateCartTotalValue(id, quantity);
    await store.proceedToPayment();
  });
});

test.describe("Payments", () => {
  test("Payment - Payment summary", async ({ page }) => {
    const store = new StorePage(page);
    const { id, name, price, quantity } = PRODUCTS.lightSaber;
    await store.reviewPaymentList(id, name, price, quantity);
  });

  test("Payment - Payment total value", async ({ page }) => {
    const store = new StorePage(page);
    const { id, quantity } = PRODUCTS.lightSaber;
    await store.reviewPaymentTotalValue(id, quantity);
  });

  test("Payment - Complete purchase", async ({ page }) => {
    const store = new StorePage(page);
    const { id, quantity } = PRODUCTS.lightSaber;
    const paymentMethod =
      PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];
    await store.reviewPaymentTotalValue(id, quantity);
    await store.choosePaymentMethod(paymentMethod);
    await store.proceedToOrders();
  });
});

test.describe("Orders", () => {
  test("Orders - Display past orders", async ({ page }) => {
    const store = new StorePage(page);
    const { id, quantity } = PRODUCTS.lightSaber;
    const paymentMethod =
      PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];
    await store.displayPastOrders(id, quantity, paymentMethod);
  });

  test("Payment - Order details", async ({ page }) => {
    const store = new StorePage(page);
    const { id, name, quantity } = PRODUCTS.lightSaber;
    const paymentMethod =
      PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];
    await store.displayOrderDetails(id, name, quantity, paymentMethod);
  });
});
