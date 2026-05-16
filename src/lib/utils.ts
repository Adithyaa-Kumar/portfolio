// Clamp a number between min and max
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

// Pad a number with leading zeros
export const padNumber = (n: number, digits = 2): string =>
  String(n).padStart(digits, "0");

// Map a value from one range to another
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

// Delay utility
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Check if element is in viewport
export const isInViewport = (el: HTMLElement, offset = 0): boolean => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight - offset && rect.bottom > offset;
};