import { test, expect } from '@playwright/test';
import { PRODUCTS } from './data/store.data';

test.describe('STORE - Inventory', () => {

    test.beforeEach( async ({ page }) => {
        await page.goto('/store');
        await page.getByTestId('store-tab-inventory').click(); 
        await expect(page.getByTestId('inventory-title')).toBeVisible();
    });


    for( const product of PRODUCTS ) {
        const title = `${product.name}`;

        test('Add ' + title, async ({ page }) => {
            
            await test.step('Add product - ' + title, async () => {
                await page.getByTestId('inventory-input-name').fill(product.name);
                await page.getByTestId('inventory-input-price').fill(product.price);
                await page.getByTestId('inventory-input-quantity').fill(product.quantity);
                await page.getByTestId('inventory-submit-button').click();
                await expect(page.getByText(product.name)).toBeVisible();

            });
            
            await test.step('Increase ' + title + ' quantity by 1', async () => {
                const newQuantity = String(Number(product.quantity) + 1)
                await page.getByTestId('inventory-product-increase-8').click();
                await expect(page.getByTestId('inventory-product-quantity-8')).toContainText(newQuantity);
                await page.getByTestId('inventory-product-decrease-8').click();
                await expect(page.getByTestId('inventory-product-quantity-8')).toContainText(product.quantity);


            });
        });
    };
});





// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
