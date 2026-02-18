/**
 * Converts milliseconds to a human-readable duration string.
 * @param ms - The number of milliseconds to convert.
 * @returns A string representing the duration (e.g., '2h 30m 15s').
 * @throws {TypeError} If input is not a finite number.
 */
export function humanizeDuration(ms: number): string {
  if (typeof ms !== 'number' || isNaN(ms) || !isFinite(ms)) {
    throw new TypeError('Input must be a finite number');
  }

  const isNegative = ms < 0;
  const absoluteMs = Math.abs(ms);

  const units = [
    { name: 'y', milliseconds: 31536000000 },   // 60 * 60 * 24 * 365
    { name: 'mo', milliseconds: 2592000000 },   // 60 * 60 * 24 * 30
    { name: 'd', milliseconds: 86400000 },    // 60 * 60 * 24
    { name: 'h', milliseconds: 3600000 },    // 60 * 60 * 1000
    { name: 'm', milliseconds: 60000 },     // 60 * 1000
    { name: 's', milliseconds: 1000 },
    { name: 'ms', milliseconds: 1 },
  ];

  const parts: { value: number; unit: string }[] = [];
  let remaining = absoluteMs;

  for (const { name, milliseconds: msInUnit } of units) {
    const count = Math.floor(remaining / msInUnit);
    if (count > 0) {
      parts.push({ value: count, unit: name });
      remaining -= count * msInUnit;
    }
  }

  if (parts.length === 0) {
    return '0ms';
  }

  const result = parts.map(part => `${part.value}${part.unit}`).join(' ');
  return isNegative ? `-${result}` : result;
}