/**
 * Credentials read from the environment, with public-demo fallbacks.
 *
 * Reading from `process.env` keeps secrets out of the code; the `?? 'default'`
 * fallback means the suite still runs green without a `.env` file (SauceDemo's
 * credentials are public). In Module 3 this moves into a typed `data/users.ts`.
 */
export const CREDENTIALS = {
  standardUser: process.env.STANDARD_USER ?? 'standard_user',
  lockedOutUser: process.env.LOCKED_OUT_USER ?? 'locked_out_user',
  password: process.env.SAUCEDEMO_PASSWORD ?? 'secret_sauce',
};
