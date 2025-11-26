import { expect, test } from "@playwright/test";
import { InventoryPage } from "./inventory.page";
import { CatalogPage } from "./catalog.page";
import { CartPage } from "./cart.page";

export class StorePage {
  constructor(page) {
    this.page = page;

    this.root = page.getByTestId("store-page");
    this.catalog = new CatalogPage(page);
    this.cart = new CartPage(page);
  }

  async addProductToCart(id, name, price, quantity) {
    await test.step ('Check items quantities and totals', async () => {
      await this.catalog.navigateToStoreCatalog();
      await this.catalog.addToCart(id, quantity);
      await this.cart.clickCartTab();
      await this.cart.checkCartProductItems(id, name, price, quantity);
    });
  }

  async validateCartTotalValue (id, quantity) {
    await test.step('Calculate total', async () => {
      await this.catalog.navigateToStoreCatalog();
      await this.catalog.addToCart(id, quantity);
      await this.cart.clickCartTab();
      await this.cart.checkCartTotalValue(); 
    });
  }

  async proceedToPayment (id, quantity) {
    await test.step('Proceed to Payment step', async () =>{
      await this.cart.clickGoToPaymentsButton();
    });
  }
  
}
