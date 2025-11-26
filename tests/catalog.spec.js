import { test, expect } from "@playwright/test";
import { ERROR_MESSAGE, PRODUCTS, DISABLED_BUTTON } from "./data/store.data";
import { CatalogPage } from "./pages/catalog.page";

test.describe("Catalog", () => {
  test.beforeEach(async ({ page }) => {
    const catalog = new CatalogPage(page);
    await catalog.navigateToStoreCatalog();
  });

  test("Catalog - Add item to cart (if available)", async ({ page }) => {
    const catalog = new CatalogPage(page);
    const { id, name, price, quantity } = PRODUCTS.lightSaber;
    await catalog.addToCart(id, quantity);
  });

  test("Catalog - Prevent adding OOS items", async ({ page }) => {
    const catalog = new CatalogPage(page);
    const { id, name, price, quantity } = PRODUCTS.lightSaber;
    await catalog.addToCart(id, quantity);
    await catalog.disabledButton(id, DISABLED_BUTTON);
  });
});
