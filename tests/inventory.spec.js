import { test, expect } from '@playwright/test';
import { ERROR_MESSAGE, PRODUCTS, NEW_PRODUCT, DISABLED_BUTTON } from './data/store.data';
import { InventoryPage } from './pages/inventory.page';

test.describe('Inventory', () => {
    test.beforeEach( async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.navigateToStoreInventory();
    });
    
    test(`Inventory - Add product: ${NEW_PRODUCT.masterBall.name}`, async ({ page }) => {
        const inventory = new InventoryPage(page);
        const {id, name, price, quantity} = NEW_PRODUCT.masterBall;
        await inventory.addProduct(name, price, quantity);
        await inventory.checkNewProduct(id, name);
    });
    
    
    test('Inventory - Increase product stock quantity', async ({ page }) => {
        const inventory = new InventoryPage(page);
        const {id, name, price, quantity} = PRODUCTS.lightSaber;
        await inventory.increaseQuantity(id, name, quantity);

    });

    test('Inventory - Decrease product stock quantity (min: 0)', async ({ page }) => {
        const inventory = new InventoryPage(page);
        const {id, name, price, quantity} = PRODUCTS.lightSaber;
        await inventory.decreaseQuantity(id, name, quantity);

    });
        
});