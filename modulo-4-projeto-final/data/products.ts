/**
 * Static test data — SauceDemo product names.
 *
 * Asserting against exact product names? Use these constants instead of inline
 * strings so a catalogue rename is a one-line change (Data Strategy: static data).
 */
export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export type ProductName = (typeof PRODUCTS)[keyof typeof PRODUCTS];
