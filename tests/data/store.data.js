import { expect, test } from '@playwright/test';

export const PRODUCTS = [
    {
        name: 'Master Ball',
        price: '19.99',
        quantity: '3',
    },
    {
        name: 'Somber Smithing Stone',
        price: '100.5',
        quantity: '2',
    },
    {
        name: 'Cat Potion',
        price: '5',
        quantity: '1',
    },
];

export const ERROR_MESSAGES = {
    message: 'Please fill in all fields!',
  };

export const DISABLED_BUTTON = {
    name: 'Out of Stock',
};