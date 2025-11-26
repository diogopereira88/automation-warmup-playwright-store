import { test, expect } from "@playwright/test";
import { CartPage } from "./pages/cart.page";

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    const cart = new CartPage(page);
    await cart.navigateToStoreCart();
  });

  test("Cart - Display empty Cart", async ({ page }) => {
    const cart = new CartPage(page);
    await cart.emptyCart();
  });
});
