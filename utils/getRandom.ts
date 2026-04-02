/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - The minimum integer
 * @param {number} max - The maximum integer
 * @returns {number} A random integer between min and max
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}