import { expect, test } from "@playwright/test";

export const PRODUCTS = {
  lightSaber: {
    id: "0",
    name: "Lightsaber (Star Wars)",
    price: "9999.99",
    quantity: "2",
  },
};

export const NEW_PRODUCT = {
  masterBall: {
    id: "8",
    name: "Master Ball",
    price: "20.00",
    quantity: "1",
  },
};

export const DISABLED_BUTTON = {
  name: "Out of Stock",
};

export const PAYMENT_METHODS = ['MBWay', 'Klarna', 'Multibanco', 'PayPal', 'Visa'];


