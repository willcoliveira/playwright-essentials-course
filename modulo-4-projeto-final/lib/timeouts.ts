/**
 * Named timeout constants (milliseconds).
 *
 * Project Convention MUST #3 / WON'T #8: never use magic-number timeouts — reach
 * for a semantic name that matches the operation. SauceDemo is fast, so most tests
 * rely on the defaults, but these exist for slow elements and retryable blocks.
 */
export const TIMEOUT = {
  /** Quick visibility checks. */
  SHORT: 5_000,
  /** Standard interactions. */
  MEDIUM: 10_000,
  /** Slow-loading elements (iframes, heavy pages). */
  LONG: 15_000,
  /** Action timeouts. */
  ACTION: 30_000,
  /** Retryable operations (toPass, expect.poll). */
  EXTENDED: 60_000,
} as const;
