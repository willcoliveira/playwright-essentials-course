/**
 * Static test data — SauceDemo users (single source of truth).
 *
 * These are the public demo credentials documented on saucedemo.com. Centralising
 * them here keeps credentials out of the spec files (Project Convention WON'T #3)
 * and gives every test a typed, autocompleted reference.
 */
export interface UserCredentials {
  readonly username: string;
  readonly password: string;
}

const PASSWORD = 'secret_sauce';

export const USERS = {
  /** The happy-path user used by most flows and by global auth setup. */
  standard: { username: 'standard_user', password: PASSWORD },
  /** Rejected at login — used for the negative authentication test. */
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  /** Renders a buggy UI — useful for resilience exercises. */
  problem: { username: 'problem_user', password: PASSWORD },
  /** Intentionally slow — useful for timeout/wait exercises. */
  performanceGlitch: { username: 'performance_glitch_user', password: PASSWORD },
} as const satisfies Record<string, UserCredentials>;

/** A valid username with the wrong password — for negative login testing. */
export const INVALID_LOGIN: UserCredentials = {
  username: 'standard_user',
  password: 'wrong_password',
};
