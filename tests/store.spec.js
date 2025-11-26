import { test, expect } from '@playwright/test';
import { ERROR_MESSAGE, PRODUCTS, DISABLED_BUTTON } from './data/store.data';
import { StorePage } from './pages/store.page';
      


test.describe('Cart', () => {
    
    test('Cart - Display Cart items (if any)', async ({ page }) => {
        const store = new StorePage(page);
        const {id, name, price, quantity} = PRODUCTS.lightSaber;
        await store.addProductToCart(id, name, price, quantity);
    });

    test('Cart - Calculate Cart total and proceed to Payments', async ({ page }) => {
        const store = new StorePage(page);
        const {id, name, price, quantity} = PRODUCTS.lightSaber;
        await store.validateCartTotalValue(id, quantity);
        await store.proceedToPayment();
    });

  

    
});