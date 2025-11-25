import { expect, test } from '@playwright/test';


export class CatalogPage {
    constructor (page) {
        this.page = (page);

        this.root = page.getByTestId('store-page');
        this.catalogTab = page.getByTestId('store-tab-catalog')
        this.title = page.getByTestId('catalog-title');
    }

// ------------------------ 

    catalogItem(id) {
        return this.page.getByTestId(`catalog-item-${id}`);
    }
    
    catalogItemName(id) {
        return this.page.getByTestId(`catalog-item-name-${id}`);
    }

    catalogItemPriceValue(id) {
        return this.page.getByTestId(`catalog-item-price-value-${id}`);
    }

    catalogItemQuantity(id) {
        return this.page.getByTestId(`catalog-item-quantity-${id}`);
    }

    catalogItemAddButton(id) {
        return this.page.getByTestId(`catalog-item-add-button-${id}`);
    }

// ------------------------


    async navigateToStoreCatalog() {
        await test.step('Navigate to /store page and go to Product Catalog', async () => {
          await this.page.goto('/store');
          await expect(this.root).toBeVisible();
          await this.catalogTab.click(); 
          await expect(this.title).toHaveText('Product Catalog');
        });
    }

// ------------------------

    async clickAddButton(id, add) {
        await test.step(`Click on "Add to Cart" button`, async () => {
            await this.catalogItemAddButton(id).click({clickCount: add});
        });
    }

    async addToCart(id, quantity) {
        const title = await this.catalogItemName(id).textContent();
        const disabled = await this.catalogItemAddButton(id).isDisabled();
        await test.step(`Add ${quantity} "${title}" to the cart`, async () => {
            if (quantity === 0) {
                return;
            };
            if (disabled) {
                return;
            };
            await this.clickAddButton(id, quantity);       
        });
    }

    async  disabledButton(id, buttonName) {
        await expect(this.catalogItemAddButton(id)).toBeDisabled();
        await expect(this.catalogItemAddButton(id)).toHaveText(buttonName.name);
    }



}