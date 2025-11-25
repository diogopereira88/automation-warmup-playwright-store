import { test, expect } from '@playwright/test';
import { ERROR_MESSAGE, PRODUCTS, DISABLED_BUTTON } from './data/store.data';
import { InventoryPage } from './pages/inventory.page';
import { CatalogPage } from './pages/catalog.page';

test.describe('STORE - Inventory', () => {
    test.beforeEach( async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.navigateToStoreInventory();
    });

    for( const product of PRODUCTS ) {
        const title = `${product.name}`;
        test(`Inventory - Add product: ${title}`, async ({ page }) => {
            const inventory = new InventoryPage(page);
            await inventory.addProduct(product.name, product.price, product.quantity);
            await inventory.checkNewProduct(8, product.name);
        });
    };

    test('Inventory - Increase product stock quantity', async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.addProduct(PRODUCTS[0].name, PRODUCTS[0].price, PRODUCTS[0].quantity);
        await inventory.increaseQuantity(8, PRODUCTS[0].name, PRODUCTS[0].quantity);

    });

    test('Inventory - Decrease product stock quantity (min: 0)', async ({ page }) => {
        const inventory = new InventoryPage(page);
        await inventory.addProduct(PRODUCTS[1].name, PRODUCTS[1].price, PRODUCTS[1].quantity);
        await inventory.decreaseQuantity(8, PRODUCTS[1].name, PRODUCTS[1].quantity);

    });
        
    // test('Inventory - Error message (empty fields)', async ({ page }) => {
    //     const inventory = new InventoryPage(page);
    //     await inventory.clickSubmit();
    //     await inventory.validateErrorMessage(ERROR_MESSAGE);

    // });
});

test.describe('STORE - Catalog', () => {
    test.beforeEach( async ({ page }) => {
        const catalog = new CatalogPage(page);
        await catalog.navigateToStoreCatalog();
    });

    test('Catalog - Add item to cart (if available)', async ({ page }) => {
        const catalog = new CatalogPage(page);
        await catalog.addToCart(0, 2);
    });

    test('Catalog - Prevent adding OOS items', async ({ page }) => {
        const catalog = new CatalogPage(page);
        await catalog.addToCart(0, 2);
        await catalog.disabledButton(0, DISABLED_BUTTON);

    })

    



});