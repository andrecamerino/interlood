/**
 * Normalizes a string for comparison:
 * - trims whitespace
 * - converts to lowercase
 * - removes accents/diacritics
 * - optionally removes non-alphanumeric characters
 *
 * @param str - The string to normalize
 * @returns A normalized string
 */
export function normalizeString(str: string): string {
    return str
        .trim()
        .toLowerCase()
        .normalize("NFD")      // decompose accented characters
        .replace(/[\u0300-\u036f]/g, "")  // remove accents
        .replace(/[^a-z0-9 ]/g, "");      // optional: remove punctuation
}