import { expect, test } from '@playwright/test';


export class InventoryPage {
    constructor (page) {
        this.page = (page);

        this.root = page.getByTestId('store-page');
        this.inventoryTab = page.getByTestId('store-tab-inventory')
        this.title = page.getByTestId('inventory-title');
        this.nameInput = page.getByTestId('inventory-input-name');
        this.priceInput = page.getByTestId('inventory-input-price');
        this.quantityInput = page.getByTestId('inventory-input-quantity');
        this.submitButton = page.getByTestId('inventory-submit-button');
        
    }

  // ------------------------ 

    productItem(id) {
        return this.page.getByTestId(`inventory-product-${id}`);
    }
    
    productItemName(id) {
        return this.page.getByTestId(`inventory-product-name-${id}`);
    }

    productItemPriceValue(id) {
        return this.page.getByTestId(`inventory-product-price-value-${id}`);
    }

    productItemQuantity(id) {
        return this.page.getByTestId(`inventory-product-quantity-${id}`);
    }

    productItemQuantityDecrease(id) {
        return this.page.getByTestId(`inventory-product-decrease-${id}`);
    }

    productItemQuantityIncrease(id) {
        return this.page.getByTestId(`inventory-product-increase-${id}`);
    }

// ------------------------    

    async navigateToStoreInventory() {
        await test.step('Navigate to /store page and go to Inventory Management', async () => {
          await this.page.goto('/store');
          await expect(this.root).toBeVisible();
          await this.inventoryTab.click(); 
          await expect(this.title).toHaveText('Inventory Management');
        });
    }

// ------------------------    

    async fillNameInput(text) {
        await test.step(`Fill product name input: ${text}`, async () => {
            await this.nameInput.fill(text);
        });
    }

    async fillPriceInput(text) {
        await test.step(`Fill product price input: ${text}`, async () => {
            await this.priceInput.fill(text);
        });
    }

    async fillQuantityInput(text) {
        await test.step(`Fill product quantity input: ${text}`, async () => {
            await this.quantityInput.fill(text);
        });
    }

    async clickSubmit() {
        await test.step(`Click on "Add Product" button`, async () => {
            await this.submitButton.click();
        });
    }


// ------------------------    

    async addProduct(name, price, quantity) {
        await test.step(`Add new product - ${name}`, async () => {
            await this.fillNameInput(name);
            await this.fillPriceInput(price);
            await this.fillQuantityInput(quantity);
            await this.clickSubmit();
            
        });
    }

    async checkNewProduct(id, text) {
        await test.step(`Assert "${text}" was successfull added to the Inventory list`, async () => {
            await expect(this.productItem(id)).toBeVisible();
            await expect(this.productItemName(id)).toHaveText(text);
        });
    }

    async increaseQuantity(id, text, quantity) {
        const increase = 2;
        const current = Number(quantity);
        const newQuantity = String(current + increase);
        await test.step(`Increase "${text}" quantity by ${increase}`, async () => {
            await this.productItemQuantityIncrease(id).click({clickCount: increase});
            await expect(this.productItemQuantity(id)).toHaveText(newQuantity);      
        })
    }

    async decreaseQuantity(id, text, quantity) {
        const decrease = 4;
        const current = Number(quantity);
        const clicks = Math.min(decrease, current);
        const newQuantity = String(current - clicks);
        await test.step(`Decrease "${text}" quantity by ${clicks}`, async () => {
            if (clicks > 0) {
                await this.productItemQuantityDecrease(id).click({clickCount: clicks});                
            }
            await expect(this.productItemQuantity(id)).toHaveText(newQuantity);
        })
    }


// ------------------------    


}