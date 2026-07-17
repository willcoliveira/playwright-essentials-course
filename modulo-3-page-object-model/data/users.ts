/**
 * Static test data — SauceDemo users (single source of truth).
 *
 * In Module 2 the credentials came from `.env`. Here they move to a typed data
 * module: they are public demo values, every test gets autocomplete, and there is
 * one place to change them. Prefer a typed `data/` module over `.env` for
 * non-secret fixtures.
 */
export interface UserCredentials {
  readonly username: string;
  readonly password: string;
}

const PASSWORD = 'secret_sauce';

export const USERS = {
  /** The happy-path user. */
  standard: { username: 'standard_user', password: PASSWORD },
  /** Rejected at login — used for the negative authentication test. */
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
} as const satisfies Record<string, UserCredentials>;

/** A valid username with the wrong password — for negative login testing. */
export const INVALID_LOGIN: UserCredentials = {
  username: 'standard_user',
  password: 'wrong_password',
};
