/**
 * Static test data — checkout customer information.
 *
 * The exact values don't matter to SauceDemo's checkout, so a single shared
 * default is enough. If a test needed unique values per run (to avoid collisions
 * in parallel), this is where a faker-based factory would live instead
 * (see Data Strategy: dynamic factories).
 */
export interface CustomerInfo {
  readonly firstName: string;
  readonly lastName: string;
  readonly postalCode: string;
}

export const DEFAULT_CUSTOMER: CustomerInfo = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  postalCode: '1000-001',
};
