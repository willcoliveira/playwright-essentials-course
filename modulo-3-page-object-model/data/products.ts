/**
 * Static test data — SauceDemo product names.
 *
 * Assert against these constants instead of inline strings, so a catalogue rename
 * is a one-line change.
 */
export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
} as const;

export type ProductName = (typeof PRODUCTS)[keyof typeof PRODUCTS];
