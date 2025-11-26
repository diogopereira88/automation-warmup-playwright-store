import { expect, test } from "@playwright/test";
import { InventoryPage } from "./inventory.page";
import { CatalogPage } from "./catalog.page";
import { CartPage } from "./cart.page";
import { PaymentPage } from "./payments.page";
import { OrderPage } from "./orders.page";

export class StorePage {
  constructor(page) {
    this.page = page;

    this.root = page.getByTestId("store-page");
    this.catalog = new CatalogPage(page);
    this.cart = new CartPage(page);
    this.payment = new PaymentPage(page);
    this.order = new OrderPage(page);
  }

  // -----------------------

  async addProductToCart(id, name, price, quantity) {
    await test.step("Check items' quantities and totals", async () => {
      await this.catalog.navigateToStoreCatalog();
      await this.catalog.addToCart(id, quantity);
      await this.cart.clickCartTab();
      await this.cart.checkCartProductItems(id, name, price, quantity);
    });
  }

  async validateCartTotalValue(id, quantity) {
    await test.step("Calculate total", async () => {
      await this.catalog.navigateToStoreCatalog();
      await this.catalog.addToCart(id, quantity);
      await this.cart.clickCartTab();
      await this.cart.checkCartTotalValue();
    });
  }

  async proceedToPayment() {
    await test.step("Proceed to Payment step", async () => {
      await this.cart.clickGoToPaymentsButton();
    });
  }

  // -----------------------

  async reviewPaymentList(id, name, price, quantity) {
    await test.step("Review items' quantities and totals", async () => {
      await this.catalog.navigateToStoreCatalog();
      await this.catalog.addToCart(id, quantity);
      await this.cart.clickCartTab();
      await this.proceedToPayment();
      await this.payment.reviewPaymentSummary(id, name, price, quantity);
    });
  }

  async reviewPaymentTotalValue(id,quantity) {
    await test.step("Review calculate total", async () => {
      await this.catalog.navigateToStoreCatalog();
      await this.catalog.addToCart(id, quantity);
      await this.cart.clickCartTab();
      await this.proceedToPayment();
      await this.payment.reviewPaymentTotalValue();
      
    });
  }

  async choosePaymentMethod(pay) {
    await test.step("Choose payment method", async () => {
      await this.payment.selecPaymentMethod(pay);
    });
  }

  async proceedToOrders() {
    await test.step("Proceed to Orders page", async () => {
      await this.payment.clickConfirmPayment();
    });
  }


  // -----------------------

  async displayPastOrders(id, quantity, pay) {
    await test.step("Complete a purchase and display past orders", async () => {
      await this.catalog.navigateToStoreCatalog();
      await this.catalog.addToCart(id, quantity);
      await this.cart.clickCartTab();
      await this.proceedToPayment();
      await this.choosePaymentMethod(pay);
      await this.proceedToOrders();
      await this.order.displayPreviousOrder(id);
    });
  }

  async displayOrderDetails (id, name, quantity, pay) {
    await test.step("Display Order details", async () => {
      await this.catalog.navigateToStoreCatalog();
      await this.catalog.addToCart(id, quantity);
      await this.cart.clickCartTab();
      await this.proceedToPayment();
      await this.choosePaymentMethod(pay);
      await this.proceedToOrders();
      await this.order.reviewOrderDetails(id, name, quantity, pay)
      await this.order.reviewOrderTotalValue(id);

    });
  }



}
