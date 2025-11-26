import { expect, test } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    this.root = page.getByTestId("store-page");
    this.cartTab = page.getByTestId("store-tab-cart");
    this.title = page.getByTestId("cart-title");
    this.emptyMessage = page.getByTestId("cart-empty-message");
    this.cartTotalValue = page.getByTestId("cart-total-value");
    this.proceedToPaymentsButton = page.getByTestId("cart-go-to-payment");
  }

  // -----------------------

  cartItem(id) {
    return this.page.getByTestId(`cart-item-${id}`);
  }

  cartItemName(id) {
    return this.page.getByTestId(`cart-item-name-${id}`);
  }

  cartItemPriceValue(id) {
    return this.page.getByTestId(`cart-item-price-value-${id}`);
  }

  cartItemQuantity(id) {
    return this.page.getByTestId(`cart-item-quantity-${id}`);
  }

  cartItemTotalValue(id) {
    return this.page.getByTestId(`cart-item-total-value-${id}`);
  }

  cartAllItemsTotalValue() {
    return this.page.$$('[data-testid^="cart-item-total-value-"]');
  }

  // ------------------------

  async navigateToStoreCart() {
    await test.step("Navigate to /store page and access the Cart", async () => {
      await this.page.goto("/store");
      await expect(this.root).toBeVisible();
      await this.cartTab.click();
      await expect(this.title).toHaveText("Your Cart");
    });
  }

  async clickCartTab() {
    await test.step("Click Cart tab and access Cart page", async () => {
      await this.cartTab.click();
    });
  }

  async emptyCart() {
    await test.step("Check empty Cart message", async () => {
      await expect(this.emptyMessage).toHaveText("Your cart is empty.");
    });
  }

  // ------------------------

  async clickGoToPaymentsButton() {
    await test.step(`Click on "Go to Payments" button`, async () => {
      await this.proceedToPaymentsButton.click();
      await expect(this.page.getByTestId("payment-title")).toBeVisible();
    });
  }

  async checkCartProductItems(id, name, price, quantity) {
    await test.step(`Assert "${name}" was successfull added to Cart`, async () => {
      const total = Number(price) * Number(quantity);
      const totalFixed = total.toFixed(2);

      await expect(this.cartItem(id)).toBeVisible();
      await expect(this.cartItemName(id)).toHaveText(name);
      await expect(this.cartItemPriceValue(id)).toHaveText(price);
      await expect(this.cartItemQuantity(id)).toHaveText(quantity);
      await expect(this.cartItemTotalValue(id)).toHaveText(totalFixed);
    });
  }

  async checkCartTotalValue() {
    await test.step("Calculated total value is correct", async () => {
      const itemsTotal = await this.cartAllItemsTotalValue();
      let cartTotal = 0;
      for (const item of itemsTotal) {
        const value = await item.textContent();
        cartTotal += parseFloat(value);
      }
      const cartTotalFixed = cartTotal.toFixed(2);
      await expect(this.cartTotalValue).toHaveText(cartTotalFixed);
    });
  }
}
