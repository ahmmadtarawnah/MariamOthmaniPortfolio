/**
 * Shared "the preloader is done" flag. The event alone is not enough: anything
 * that mounts after the preloader finishes would never hear it and would stay
 * in its pre-entrance state, so listeners check the flag as well.
 */
const EVENT = "mo:loaded";

let loaded = false;

export function isLoaded() {
  return loaded;
}

export function markLoaded() {
  if (loaded) return;
  loaded = true;
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Calls back once, immediately if the preloader has already finished. */
export function onLoaded(fn: () => void) {
  if (loaded) {
    fn();
    return () => {};
  }
  window.addEventListener(EVENT, fn, { once: true });
  return () => window.removeEventListener(EVENT, fn);
}
